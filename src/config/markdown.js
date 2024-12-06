'use strict'

const MarkdownIt = require('markdown-it')
const hljs = require('highlight.js').default

const markdown = new MarkdownIt({
    // Convert '\n' in paragraphs into <br>
    breaks: true,

    // Autoconvert URL_like text to links (e.g. google.com)
    linkify: true,
    
    //
    highlight: (str, lang) => {
        if (!lang && !hljs.getLanguage(lang)) return ''

        try {
            return hljs.highlight(str, {
             language: lang,
             ignoreIllegals: true
            }).value
        } catch (error) {
            console.error('Error highlighting lang: ', error.message)
            throw error
        }
    }
})

module.exports = markdown