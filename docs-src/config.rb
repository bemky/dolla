require 'github/markup'

# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

set :build_dir, '../docs'
activate :condenser do |config|
  config.path = Dir.each_child(UniformUi::ASSET_PATH).map { |a| File.join(UniformUi::ASSET_PATH, a) }
  config.path << File.realpath('../lib')
end
# app.condenser.register_postprocessor('text/css', ::Condenser::CSSMediaCombinerProcessor)

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

# helpers do
#   def some_helper
#     'Helping'
#   end
# end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

# configure :build do
#   activate :minify_css
#   activate :minify_javascript
# end


helpers do
  
  def code(language=nil, content=nil, options={}, &block)
    unless content
      from_block = true
      raise 'The code helper requires a block to be provided.' unless block_given?
      @_out_buf, _buf_was = "", @_out_buf
      begin
        content = capture_html(&block)
      ensure
        # Reset stored buffer
        @_out_buf = _buf_was
      end
    end
    
    starting_space_indents = content.split("\n").map do |line|
      if line.match(/\S/)
        line.match(/^\s+/).to_s.size
      else
        nil
      end
    end.compact
    content.gsub!(/^[^\n]{#{starting_space_indents.min}}/, '')

    if from_block
      content = content.encode(Encoding::UTF_8)
      concat_content Middleman::Syntax::Highlighter.highlight(content, language, options).html_safe
    else
      Middleman::Syntax::Highlighter.highlight(content, language, options)
    end
  end
  
  def markdown(markup)
    return "" unless markup
    html = GitHub::Markup.render_s(GitHub::Markups::MARKUP_MARKDOWN, markup)
    code_lang = ""
    code_block = []
    code_regex = /<pre(\s+lang\=[\'\"](\w*)[\'\"])?><code>/
    html.split("\n").map do |line|
      if match = line.match(code_regex) && line =~ /<\/code><\/pre>/
        code(match[2] || 'javascript', CGI.unescapeHTML(line.sub(code_regex, "").sub("</code></pre>", "")))
      elsif match = line.match(code_regex)
        code_lang = match[2] || "javascript"
        code_block << line.sub(code_regex, "")
        nil
      elsif line =~ /<\/code><\/pre>/
        code_block << line.sub("</code></pre>", "")
        code_content = CGI.unescapeHTML(code_block.join("\n"))
        code_block = []
        code(code_lang, code_content)
      elsif code_block.length > 0
        code_block << line
        nil
      else
        line
      end
    end.compact.join("\n")
  end
  
  def source
    # return @source if @source
    @source = []
    base = File.expand_path('.././lib', __dir__)
    files = Dir.glob("*.js", base: base)
    files.each do |file|
      method_name = file.gsub(/\.js$/, '')
      body = File.read(File.join(base, file))
      content = body.match(/\/\*.*(?=\*\/)/m).to_s
      source = body.split(/\*\//, 2).last
      
      method_details = {}
      sections = content.split(/([^\n]+)\n(\-{2,})\n/)
      sections.each_with_index do |part, i|
        next unless part =~ /\-{2,}/
        method_details[sections[i - 1]] = sections[i + 1]
      end
      
      method_match = source.match(/export\sdefault\s(function)\s#{method_name}\s?\((.*)\)/)
      method_details[:method] = method_name
      method_details[:source] = source.strip.sub('export default ', '')
      method_details[:params] = method_details['Syntax'].try(:match, /\((.*)\)/).try(:[], 1)
      method_details[:params] ||= method_match.try(:[], 1)
      method_details[:params] = method_details[:params].try(:split, /\,\s?/)
      if method_match.present? || source.match(/export\sdefault\sclass/) 
        @source.push(method_details)
      end
    end
    
    @source.sort_by{|x| x[:method].downcase}
  end
  
end