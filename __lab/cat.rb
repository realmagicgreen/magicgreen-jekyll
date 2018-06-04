# ----------------------------------------------------------------------------------------------
# "THE BEER-WARE LICENSE" (Revision 42):
# As long as you retain this notice you can do whatever you want with this stuff.
# If we meet some day, and you think this stuff is worth it, you can buy me a beer in return.
# ----------------------------------------------------------------------------------------------

module Jekyll
  class CatFile < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @file = text.strip;
    end

    def render(context)
      if File.exists?(@file)
        content = File.read(@file)
      else
        raise "[cat] File #{@file} not found"
      end
      content
    end
  end
end

Liquid::Template.register_tag('cat', Jekyll::CatFile)
