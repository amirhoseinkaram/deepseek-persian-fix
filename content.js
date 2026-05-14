const fixDeepSeekV5 = () => {
  const containers = document.querySelectorAll(
    '.ds-markdown-paragraph, .ds-markdown-content, [class*="markdown"], .message-content'
  );

  containers.forEach(container => {
    if (container.dataset.deepseekFixedV5) return;
    container.dataset.deepseekFixedV5 = 'true';

    
    container.style.setProperty('direction', 'rtl', 'important');
    container.style.setProperty('text-align', 'right', 'important');
    container.style.setProperty('unicode-bidi', 'plaintext', 'important');

    
    container.querySelectorAll('.katex, .katex-display, code, pre').forEach(el => {
      el.style.setProperty('direction', 'ltr', 'important');
      el.style.setProperty('unicode-bidi', 'isolate', 'important');
    });

    
    container.querySelectorAll('span').forEach(span => {
      const text = span.textContent.trim();
      if (text && !/[\u0600-\u06FF]/.test(text) && /[a-zA-Z]{2,}/.test(text)) {
        span.setAttribute('dir', 'ltr');
        span.style.setProperty('direction', 'ltr', 'important');
      }
    });
  });
};


const observer = new MutationObserver(fixDeepSeekV5);
observer.observe(document.body, { childList: true, subtree: true, characterData: true });


setTimeout(fixDeepSeekV5, 500);
setInterval(fixDeepSeekV5, 300);
