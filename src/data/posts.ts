export interface Post {
  slug: string;
  title: string;
  description: string;
  category: 'Design' | 'Engineering' | 'Product' | 'Culture';
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  date: string;
  readTime: string;
  coverImage: string;
  featured: boolean;
  content: string;
}

export const mockPosts: Post[] = [
  {
    slug: "designing-with-restraint",
    title: "Designing with Restraint: The Case for Minimal Interfaces",
    description: "Why the most premium software companies are moving away from flashy effects, neon gradients, and back to structural alignment, editorial typography, and intentional whitespace.",
    category: "Design",
    author: {
      name: "Liam Vance",
      role: "Lead Designer",
    },
    date: "June 01, 2026",
    readTime: "6 min read",
    coverImage: "/images/design_post_cover.png",
    featured: true,
    content: `## The Trend of Excess

For the past several years, web design has been dominated by a race for attention. We have seen neon cyberpunk gradients, overly glowing buttons, bouncing card animations, and glassmorphism layered upon glassmorphism. While these techniques can look striking in a conceptual Dribbble shot, they often fail in real-world products. They create visual noise, distract from content, and quickly feel dated.

Modern UI design is undergoing a correction. Premium products—like Linear, Vercel, Notion, and Raycast—are shifting back to fundamentals. They design with restraint.

---

## What is Restrained Design?

Restrained design is not about making things boring; it is about making things intentional. It is the realization that every element on a page must earn its place. If an element does not serve a functional or cognitive purpose, it is removed.

### 1. Typography Carries the Weight

When you remove background decorations and neon borders, typography must carry the visual identity. A clean sans-serif like Geist or Inter, styled with proper letter-spacing and weight hierarchy, looks infinitely more premium than a decorative font ever will.

\`\`\`css
/* Example of elegant, tight editorial tracking */
h1 {
  font-family: var(--font-sans);
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.15;
}
\`\`\`

### 2. A Strict Spacing System

One major reason projects look amateur is inconsistent spacing. If one element is 14px away and another is 20px, the eye registers this irregularity even if the user cannot name it.

A professional product uses a strict, 4px-based spacing scale:
- **4px** for micro-alignments (e.g., icons next to labels)
- **8px** or **12px** for tight groupings (e.g., tags and categories)
- **16px** for standard components
- **24px** or **32px** for larger page gaps
- **48px** or **64px** for hero section margins

By restricting your choices to these increments, your layouts automatically feel balanced, structured, and consistent.

---

## The 90/10 Color Rule

Color should be treated as a scarce resource. Professional interfaces typically limit their color palette to:
- **90% Neutrals**: Zinc, slate, or gray scales for backgrounds, borders, cards, and primary text.
- **10% Accents**: A single primary accent color (such as a deep indigo, warm gold, or minimal forest green) to draw attention to critical elements like active navigation items or primary call-to-actions.

When everything is colorful, nothing is. Restraint makes color powerful.

---

## Conclusion

The next time you build an interface, resist the temptation to add a shadow, a hover bounce, or a shiny gradient. Instead, focus on alignment, whitespace, and font hierarchy. The best professional interfaces are not defined by what you add, but by what you leave out.`,
  },
  {
    slug: "nextjs-react-compiler",
    title: "React Compiler in Production: Lessons Learned",
    description: "A deep-dive into how React 19's compiler changes the way we build Next.js applications, and the performance differences in state-heavy applications.",
    category: "Engineering",
    author: {
      name: "Marcus Thorne",
      role: "Staff Engineer",
    },
    date: "May 28, 2026",
    readTime: "8 min read",
    coverImage: "/images/engineering_post_cover.png",
    featured: false,
    content: `## The Promise of Zero-Memoization

For years, React developers spent significant mental energy managing rendering performance. We manually wrapped functions in \`useCallback\`, memoized calculations with \`useMemo\`, and protected child components with \`React.memo\`. It was boilerplate-heavy, error-prone, and required deep knowledge of React's internals.

The React Compiler (formerly React Forget) promises to end this era by automatically memoizing components and hooks under the hood during the build process.

---

## How It Works in Next.js

In Next.js, the compiler compiles your components into highly optimized JavaScript that caches values and DOM nodes. When state changes, only the exact nodes dependent on that state are re-evaluated.

Here is a typical pattern that previously required manual optimization:

\`\`\`tsx
// Before React Compiler:
const ExpensiveComponent = ({ items, filterText }) => {
  const filteredItems = useMemo(() => {
    return items.filter(item => item.name.includes(filterText));
  }, [items, filterText]);

  const handleSelect = useCallback((id: string) => {
    console.log("Selected:", id);
  }, []);

  return (
    <ItemList 
      items={filteredItems} 
      onSelect={handleSelect} 
    />
  );
};
\`\`\`

With the React Compiler enabled in \`next.config.ts\`, you can write raw JavaScript, and the output is compiled to have identical—or better—performance characteristics than the manually optimized version:

\`\`\`tsx
// After React Compiler (Simple & Clean):
const ExpensiveComponent = ({ items, filterText }) => {
  const filteredItems = items.filter(item => item.name.includes(filterText));
  const handleSelect = (id: string) => {
    console.log("Selected:", id);
  };

  return (
    <ItemList 
      items={filteredItems} 
      onSelect={handleSelect} 
    />
  );
};
\`\`\`

---

## Performance Auditing

In our testing of a dashboard containing over 500 interactive nodes and real-time WebSocket updates, enabling the compiler resulted in:
1. **60% reduction** in unnecessary child re-renders.
2. **15% faster** initial interaction response times (FID / INP improvements).
3. **Zero code regression** across a codebase of 40,000 lines of TypeScript.

### Recommendations for Adoption
* **Enable Strict Mode**: The compiler relies on code being pure. Side effects during render will break behavior.
* **Keep Props Immutable**: Do not mutate props directly; always return new objects or arrays to let the compiler track changes correctly.
* **Use ESLint Rules**: Install \`eslint-plugin-react-compiler\` to catch issues that would prevent the compiler from optimizing specific files.`,
  },
  {
    slug: "crafting-product-principles",
    title: "Crafting Opinionated Product Principles",
    description: "Why building a successful startup requires opinionated product design guidelines over democratic customer feature polls.",
    category: "Product",
    author: {
      name: "Sophia Chen",
      role: "VP of Product",
    },
    date: "May 20, 2026",
    readTime: "5 min read",
    coverImage: "/images/product_post_cover.png",
    featured: false,
    content: `## The Trap of Democratic Feedback

When building a new software product, it is easy to fall into the trap of democratic development. You receive feature requests from ten different clients, create a poll, build whatever gets the most votes, and repeat. 

While this makes customers feel heard in the short term, it invariably leads to a product that is:
- Bloated and hard to navigate
- Lacking a cohesive core philosophy
- Marginally useful for many, but loved by none

The most successful products of our generation—Notion, Slack, Linear—did not build what was popular; they built what matched their opinionated worldview.

---

## Defining Product Principles

An opinionated product requires a clear set of principles. A great principle is not a motherhood-and-apple-pie statement like "Our software should be fast." (No one builds software with the goal of being slow).

A great principle is a trade-off. It says: **"We choose X even if it means sacrificing Y."**

### Example: Speed Over Richness
* *Principle*: "We prioritize speed and keyboard efficiency over full-page layouts."
* *Trade-off*: We will reject features that require heavy interactive visual builders if they slow down the editor load time or complicate keyboard navigation.

### Example: Content Over Settings
* *Principle*: "We enforce clean, minimal defaults over customizable options."
* *Trade-off*: We do not allow users to change border radiuses, font selections, or colors of cards. The design is locked to ensure visual harmony and editorial appeal.

---

## Saying No

The hardest part of product management is not deciding what to build—it is deciding what *not* to build. When a major customer asks for a feature that contradicts your core principles, saying "No" preserves the integrity of the product.

In the long run, users will thank you for keeping the product simple, fast, and focused.`,
  },
  {
    slug: "sustainable-engineering-culture",
    title: "Cultivating a High-Ownership Engineering Culture",
    description: "Moving beyond sprint charts and velocity metrics to build self-organizing teams focused on quality, user impact, and product polish.",
    category: "Culture",
    author: {
      name: "Devon Miller",
      role: "Engineering Director",
    },
    date: "May 12, 2026",
    readTime: "7 min read",
    coverImage: "/images/culture_post_cover.png",
    featured: false,
    content: `## The Failure of Story Points

Many engineering organizations measure success using Jira tickets, sprint velocities, and story point charts. While these tools give managers a sense of predictability, they often incentivize the wrong behaviors. Engineers become focused on "finishing the ticket" rather than "solving the problem."

When success is measured by velocity:
- Code quality is sacrificed to meet arbitrary sprint deadlines.
- Micro-interactions, animations, and edge-case bugs are ignored.
- Engineers lose context on *why* they are building a feature.

To build premium software, you must replace high-ceremony processes with high-ownership culture.

---

## Pillars of High-Ownership

High ownership means engineers behave like product owners. They do not just write code that satisfies a spec; they actively participate in defining the spec, refine the layout, and fix visual flaws before they are reported.

### 1. Direct Collaboration
Instead of passing wireframes from designer to product manager to engineer, designers and engineers should work directly in tandem. An engineer should feel empowered to adjust spacing, suggest hover transitions, or propose a simpler interface option during implementation.

### 2. The "Polish Phase"
Never schedule an engineering sprint that is 100% full of new features. Allocate at least 15% to 20% of every cycle to "polish." This is time dedicated to fixing layout alignments, improving transition timings, refactoring messy code, and optimizing load times.

### 3. Shared Context
Ensure every engineer understands the business objective behind a feature. If an engineer knows *why* a customer is struggling with a flow, they will design a more elegant technical solution than any product requirement document could specify.

---

## Conclusion

Tools do not build great software; people do. By trusting engineers, reducing project management overhead, and focusing on quality over velocity, you build a team that takes pride in their craft—and a product that shows it.`,
  }
];
