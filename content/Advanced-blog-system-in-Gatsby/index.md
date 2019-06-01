---
title: "Advanced blog system in Gatsby"
description: "Today, static site generators are one of the most popular ways to build websites. You get a complete build done quickly without complications, hosted cheaply or even for free. That’s why the…"
date: "2019-05-02T15:06:01.607Z"
categories: 
  - Web Development
  - Reactjs
  - JavaScript
  - Gatsbyjs
  - Programming

published: true
canonicalLink: https://medium.com/significa/advanced-blog-system-in-gatsby-16e0cd6b85ad
---

## Create a complete blog from scratch in Gatsby with pagination, categories, featured post, author, SEO and navigation.

![Photo by [Frederico Jesus](https://dribbble.com/Fredjesus1)](./asset-1.png)

👉 Check out the [demo](https://gatsby-advanced-blog-system.danilowoz.now.sh/blog) and [source](https://github.com/danilowoz/gatsby-advanced-blog-system).

![](./asset-2.jpeg)

### What’s Gatsby.js?

Today, static site generators are one of the most popular ways to build websites. You get a complete build done quickly without complications, hosted cheaply or even for free. That’s why the community started creating different ways to build static site generators

The React community has a couple of tools/frameworks that can generate a static website. My favorite, and yours probably too, is Gatsby: “a free and open source framework based on React that helps developers build blazing fast websites and apps.”

### 🛠 What will we build?

I suppose you know enough about Gatsby, so I won’t go into detail on how basic things like [query/StaticQuey](https://www.gatsbyjs.org/docs/static-query/), layout, and pages work. My goal here is to show you how I implemented a complete blog “from scratch” only using `gatsby-node.js` and its `pageContext` API.

So, let’s try to solve the following problems:

-   Pagination;
-   Category and tag pages (with pagination);
-   Category list (with navigation);
-   Featured post;
-   Author page;
-   Next and prev post;
-   SEO component.

### ✍️ Data structure

To organize the data, I normally create a folder in the root project called `/content` where I put all the files related to the content of my website. Then I usually create another folder named `/content/blog` which will be the base folder to write every blog post. Even though that is the way I prefer to work, feel free to choose what is better for you.

So for each new blog post, you need to create a new folder with the title slugified (or with any other name as long as it’s unique). Inside it there will be an `index.md` and every other static file that you’re going to use in the blog post.

After that, your project should look something like this:

```
... default Gatsby files
|-- content
  |   |-- blog
  |     |-- my-first-blog-post
  |     |   |-- index.md
  |     |   |-- my-image.jpeg
  |     |-- my-second-blog-post
  |         |-- index.md
  |         |-- my-another-image.jpeg
```

Now let’s take a look at how each `.md` file looks like, especially in the `frontmatter`:

```
---
title: My first blog post
date: 2019-01-21
author: Danilo Woznica
featured: true
image: ./my-image.jpeg
category:
  - News
  - Events
tags:
  - Portugal
  - Porto
---

Lorem ipsum dolor amet helvetica cardigan readymade wayfarers cold-pressed poutine. Enamel pin polaroid gluten-free helvetica single-origin coffee. Marfa cold-pressed williamsburg taxidermy Kickstarter semiotics tote bag heirloom gastropub. Quinoa pop-up brunch, vice hashtag biodiesel selfies affogato meditation pork pok heirloom chillwave yr meh marfa. Direct trade poke try-hard, raclette pok pok af succulents tbh keffiyeh four dollar toast pork belly ramps squid.
```

**Some things worth mentioning:**

-   Category and tag fields are an array of string (you will use this later);
-   The path of the image is relative to the file;
-   The featured field is a boolean and you also will handle it later.

So that’s the basic structure of your blog post. Inside this file, you will write your content but first let’s go ahead and know how the application will consume the content.

### 🤝 How does Gatsby meet the content?

First of all, we need to tell Gatsby where your content is and what it needs to do with these files. So let’s open the `gatsby-config.js` file and install a few plugins:

```
module.exports = {
  ...
  plugins: [
  ...
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-images`,
        ],
      },
    },
  ],
}
```

**These plugins are:**

-   `[gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/)`: turn the markdown readable to Gatsby;
-   `[gatsby-remark-images](https://www.gatsbyjs.org/packages/gatsby-remark-images/)`: you will need this later to consume images.

\* Don’t forget to install them and add those in the `package.json` as dev dependencies.

### ⚙️ Creating the pages

Probably you know that Gatsby uses graphql to consume the content and create its pages. So let’s skip this step and let me present you the interesting API of `gatsby-node.js`. If you have no idea what I’m talking about, please take your time to look at the documentation about [graphql in Gatsby](https://www.gatsbyjs.org/docs/querying-with-graphql/).

#### Querying the content

Now if you take a look at the graphql playground ([http://localhost:8000/\_\_\_graphql](http://localhost:8000/___graphql)) and query the content using the schema called `allMarkdownRemark` you can see the content you’ve just created. Besides that, you can [filter, sort and even skip](https://www.youtube.com/watch?v=Lg1bom99uGM) the content. But for now, you will use one of those: the sort.

So the final query looks like this:

Embed placeholder 0.28548552933743476

#### Creating the pages programmatically

Now open your `gatsby-node.js` or create it in the root folder if you don’t have this file. And let’s write a function which will: query the content, look to results, pass through for each blog post and create a new page using a custom layout.

But first of all, we need to define how the blog post URL should be. I prefer to use a WordPress friendly way, like `/blog/YEAR/MONTH/DAY/TITLE-SLUG`:

Embed placeholder 0.35025547297982973

Putting this code in `gatsby-node.js`, every markdown node will have a field called `slug` which has the path to the blog post.

From now on you can query the content and create all the pages of the blog posts, which you can do by using the following code in the same file:

Embed placeholder 0.3958022942333015

Run the Gatsby and you can see that you’ve just created the pages programmatically only using `.md` files.

### 📃 Single post page

Do you remember that in the `createPages` you referred a layout? At this moment let’s show the content of a single post on the page.

To do that, you need to use the `pageContext` (which are some variables from Gatsby) and query the content filtering by the context you just passed when you created the pages, a few steps ago.

The simplest way to load the blog post would be something like:

Embed placeholder 0.18669948904953904

So easy!

### 📰 What about the blog post list?

The same way you got all the blog posts to create the pages in the `gatsby-node.js`, you can use the same query to get all blog posts and print it on a new page. But let’s assume that you have too many posts and this list becomes quite long, it would be cool to add some kind of pagination.

For me, the infinite scroll [(which I hated)](https://logrocket.com/blog/infinite-scroll/) or the “Show more X posts” doesn’t make much sense for a blog, so I will show you how to create normal one pagination.

#### **Creating a blog post list page**

So instead of creating a file in the page folder (the regular way), let’s create another layout in `/layouts` folder and set it in the `gatsby-node.js`, above the blog post layout one:

Embed placeholder 0.3350099437095133

Then you have to decide how many posts you would like to show on each page. In my case, I think that 9 posts are of great value. Next, let’s get the amount of blog posts and remove the featured post from this count, because probably you don’t want to show this post twice, one in the hero and in the list, right?

Embed placeholder 0.5054650020507709

Now, once the magic happens, you need to create an array with the same length as the number of pages, then pass through them as you create the pages:

Embed placeholder 0.018580354931678755

Cool? Does that make sense?

If so, let’s go on.

#### **The view part**

Did you notice the keys `limit` and `skip` in the context in the last step? That will define the position of your page in the view. Then graphql will catch this info and it will only show the posts between this range.

Next, you will use this information to create the pagination component, with next and previous page, current page and navigation, by `pageContext` prop:

Embed placeholder 0.7378791179785325

### 🏷️ Getting the categories

Once you build the main page with the pagination component done, it’s quite easy to generate the categories pages. The first thing we have to do is get all categories from the blog post and count how many posts there are in each category. So let’s do it, step-by-step:

The first step is to create a new layout as you’ve already made with the blog list and blog post:

Embed placeholder 0.03114205649645041

Then, get all categories and save it in a new array:

Embed placeholder 0.3755192862612564

After that, you need to know how many posts there are in each category (remember that category field in the markdown file is an array):

Embed placeholder 0.04318843683908313

Now you have enough data to create the pages, by category and paginated:

Embed placeholder 0.7076690218344812

Once again, the page context is very important to you, because it will tell to graphql which category should query and show in the view. Please note that you’re passing the category field in the context above, now your view will look much similar to `/blog-list.js`, but with an important difference, you will filter the posts by category, which comes from the context:

Embed placeholder 0.9796061761547026

Note that only two things were updated:

-   The pagination URL;
-   Query filter.

#### **Category list**

To show a list of categories in the main blog list, just pass the field `allCategories` as a context in the pagination creation part and you’ll receive this field in the view as an array in the `pageContext`

#### **Getting the tags**

If perhaps you would like to have tags in your blog post, just repeat the same process you just did with the category.

### ⛓ Next and prev post

As you can imagine, to solve this issue, you need to pass a new context when you’re creating the blog post pages in `gatsby-node.js`. To get the next and previous posts all you need to do is catch it when you’re looping through all blog posts. Once you know that the blog posts are sorted by date, you can be sure that the next index of the array will be the next post and the previous index, the previous post, of course:

Embed placeholder 0.7955539405201257

And the view could be:

Embed placeholder 0.08000652008718978

Really easy, with any trick!

### 🔍 SEO

Last but not least, we need to update the title, descriptions and the other content of our blog for a better read by the search engine, especially on the blog post page. I’ve tried a lot of different approaches to solve this issue and, in my opinion, the way in which Gatsby does it, it’s the best I’ve seen so far. So please take a look at their [documentation](https://www.gatsbyjs.org/docs/add-seo-component/).

The good news here is that probably when you set up the Gatsby project, this component will be almost done. Just check if the component is following the [documentation](https://www.gatsbyjs.org/docs/add-seo-component/).

After everything is working fine, you can add this component into the blog post like this:

```
<SEO title={markdownRemark.frontmatter.title} />
```

### 🤔 Conclusion

If you’re looking for a complete tool to develop your personal or even commercial blog in React, with server-side-render and other wonderful optimizations, I think Gatsby is the best choice, compared to the other frameworks that exist today. It’s easy to extend, it has an amazing API that places all the power in your hands. Also, Gatsby team is always releasing great updates and doing important fixes, so you’ll be headed in the right direction with the best of the React community for the static site.

But remember that it is not a tool like Wordpress. It doesn’t have an infinity of plugins to do whatever you need (well it’s almost there) and it even doesn’t have a CMS where you can manage the content like [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG).

The solution I’ve just shown in this article, requires the person who will manage the content to have a minimal knowledge about `markdown` and version control (git). However, if it’s a required feature maybe [Prismic](https://prismic.io/) or [Netlify C](https://www.netlifycms.org/)MS could solve this problem, but I haven’t yet tried these tools within this workflow. If you already have, let me know your experience and your thoughts.

---

👉 Check out the [demo](https://gatsby-advanced-blog-system.danilowoz.now.sh/blog) and [source](https://github.com/danilowoz/gatsby-advanced-blog-system). 🎉