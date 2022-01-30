const getAuthors = function (node) {
  const result = [];
  const authorCount = node.getAttribute('authorcount')
  if (authorCount > 1) {
    for (let index = 1; index < authorCount + 1; index++) {
      const author = node.getAttribute(`author_${index}`)
      const email = node.getAttribute(`email_${index}`)
      const bio = node.getAttribute(`authorbio_${index}`)
      let twitter;
      let github;
      if (email && email.startsWith("https://github.com/")) {
        twitter = email.replace("https://twitter.com/", "");
        github = email.replace("https://github.com/", "");
      }
      result.push({ name: author, email: email, bio: bio, twitter: twitter, github: github})
    }
  } else {
    const author = node.getAttribute('author')
    const email = node.getAttribute('email')
    const bio = node.getAttribute(`authorbio`)
    let twitter;
    let github;
    if (email && email.startsWith("https://github.com/")) {
      twitter = email.replace("https://twitter.com/", "");
      github = email.replace("https://github.com/", "");
    }
    result.push({ name: author, email: email, bio: bio, twitter: twitter, github: github})
  }
  return result;
}

const renderAuthors = function (node) {
  const authors = getAuthors(node)
  return authors.map(author => {
    const authorImageUri = node.getMediaUri(`${author.github}.png`)
    return `<div class="author">
<div class="author-avatar"><img src="${authorImageUri}"/></div>
<div class="author-name"><a href="${author.email}">github.com/${author.github}</a></div>
<div class="author-bio">${author.bio}</div>
</div>
`;
  }).join('\n')
}


module.exports = {
  paragraph: (node) => `<p class="${node.getRoles().join(' ')}">${node.getContent()}</p>`,
  document: (node) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${node.getAttribute('description')}">
<meta name="author" content="${node.getAttribute('author')}">
<title>${node.getHeader().getTitle()}</title>
<link href="./limberduck/assets/style.css" rel="stylesheet">
</head>
<body>
<header>
<h1>${node.getHeader().getTitle()}</h1>
</br>
  <img class="logo" src="./limberduck/assets/logo.svg"/>
</header>
<section class="content">
${node.getContent()}
<div class="sect1 footer">
<hr color="gray" size="0.5" width="100%">
<a class="website" href="https://limberduck.github.io/nessus-cheat-sheet">limberduck.github.io/nessus-cheat-sheet</a> v${node.getAttribute('revnumber')} 
</br>
Generated on ${node.getAttribute('revdate')} by <a class="website" href="https://limberduck.org">limberduck.org</a> 
<span class="icon"><i class="fab fa-creative-commons"></i></span> 
<span class="icon"><i class="fab fa-creative-commons-by"></i></span>
<td class="content">
<p class="">
<span class="icon"><i class="fab fa-windows"></i></span> / <span class="icon"><i class="fab fa-linux"></i></span> 
zoom in <span class="keyseq"><kbd>ctrl</kbd>+<kbd>+</kbd></span> 
zoom out <span class="keyseq"><kbd>ctrl</kbd>+<kbd>-</kbd></span>
actual size <span class="keyseq"><kbd>ctrl</kbd>+<kbd>0</kbd></span>
</p>
<p class="">
<span class="icon"><i class="fab fa-apple"></i></span> 
zoom in <span class="keyseq"><kbd>⌘ cmd</kbd>+<kbd>+</kbd></span> 
zoom out <span class="keyseq"><kbd>⌘ cmd</kbd>+<kbd>-</kbd></span>
actual size <span class="keyseq"><kbd>⌘ cmd</kbd>+<kbd>0</kbd></span>
</p>
</td>
</div>
</section>
</body>`
}
