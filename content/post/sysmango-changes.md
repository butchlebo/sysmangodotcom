---
title: "Sysmango Changes"
date: 2018-11-12T12:12:21-04:00
draft: true
---

Over the last couple of months I have been thinking about how this site
is run and managed. I decided that it was time to make some changes.

When I first made the decision to move the site to Drupal, the decision
was driven around not only what I was already doing with MovableType,
but also the thought that I could maybe move beyond just being a simple
blog. At the time, a lot of sites had a blog (usually WordPress)
managing some content and then a forum to allow what ever community
happened around the site to talk to itself. Drupal had the flexibility
to put those two parts together, even if it was somewhat a strained
relationship.

Unsurprisingly, this site didn't spawn any kind of community. A few
family members, a few coworkers and a few random one-time visitors is
all it really ever attracted. I eventually converted the forum to
"regular" content and disabled the functionality, but I was still
posting my own content.

Once I discovered Markdown, I started to write all my content in
Markdown. Doing Markdown in Drupal is not hard, there is a module for
that, but with the move from Drupal 6 to Drupal 8, that started to
become a problem. Everytime I upgraded the software for the site using
drush I would have to readd the library for Markdown. If I didn't readd
it, then the site would be broken.

I do find what the Drupal community is doing with version 8 very
interesting, but right now all I really need is a simple website. And I
also want something that lets me practice using the technologies that I
am using more at work. And recently, that is DevOps. I want to be able
to manage the content in Markdown using git and use a Jenkins to get the
content delivered.

After looking at what was availalbe, I decided to move the site over to
Hugo. This was driven by Hugo just seeming to be the simpilist option.
And right now, that seems to be what I am looking for.

Not surprisingly, the footprint of the site on the server has gone done
significantly. I still have other sites using Drupal, or some other
software, and I am still using Drupal for some internal projects, but
SysMango.com is now done with Hugo.
