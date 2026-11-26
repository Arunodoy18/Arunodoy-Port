// Blog posts. Each post becomes /blog/<slug> (prerendered, in the sitemap, llms.txt and Article schema).
// `body` is HTML. Keep claims factual: no invented statistics or prices.

export const posts = [
  {
    slug: 'whatsapp-chatbot-for-business',
    seoTitle: 'What a WhatsApp Chatbot Can Automate for Your Business', // shown in Google (≤60 chars); `title` is the on-page headline
    title: 'What a WhatsApp chatbot can actually automate for your business',
    description: 'A practical guide to WhatsApp chatbots: what they automate, what they should not do, how the WhatsApp Business Platform works and how to start.',
    date: '2026-11-26',
    author: 'Arunodoy Banerjee',
    tags: ['WhatsApp', 'Automation'],
    readMins: 6,
    body: `
<p class="doc-lead">Your customers already message you on WhatsApp. The question is whether someone has to sit there answering the same ten questions all day. A well-built WhatsApp chatbot takes the repetitive part off your plate and hands the interesting conversations to a human.</p>

<h2>What it can automate</h2>
<ul>
  <li><strong>Instant answers to common questions.</strong> Prices, timings, location, delivery areas, what's in stock. The bot answers in seconds, at 2 am too.</li>
  <li><strong>Lead capture and qualification.</strong> It asks the questions your sales team would ask (budget, timeline, what they need) and saves the answers to your sheet or CRM.</li>
  <li><strong>Bookings and reminders.</strong> Customers pick a slot inside the chat, and the bot sends a confirmation and a reminder before the appointment.</li>
  <li><strong>Order and service updates.</strong> "Your order has shipped", "your report is ready", "your table is confirmed", sent automatically when something changes in your system.</li>
  <li><strong>Payment links and follow-ups.</strong> Send a payment link, then a polite reminder if it hasn't been paid.</li>
  <li><strong>Handover to a human.</strong> When a question is unusual, or the customer asks for a person, the chat moves to your team with the full history attached.</li>
</ul>

<h2>What it shouldn't do</h2>
<p>A chatbot shouldn't pretend to be a person, make promises your business can't keep, or block customers from reaching a human. It also shouldn't spam: WhatsApp is personal, and people block businesses that over-message. The best bots are short, fast and clearly helpful.</p>

<h2>How it works under the hood</h2>
<p>Business chatbots run on Meta's <strong>WhatsApp Business Platform</strong> (the Cloud API), not the regular WhatsApp app. You need a business phone number registered on the platform. Two rules shape how a bot behaves:</p>
<ul>
  <li><strong>Customer-initiated chats:</strong> when a customer messages you, you can reply freely for a limited window.</li>
  <li><strong>Business-initiated messages:</strong> reminders, updates and offers you send first must use <strong>message templates</strong> that Meta reviews and approves.</li>
</ul>
<p>Meta charges for messages by category and country, and the rates change from time to time, so check Meta's current pricing for your market before you plan a large campaign.</p>

<h2>Adding AI to the bot</h2>
<p>A classic chatbot follows a menu: "Press 1 for prices." An AI-powered one understands free-form questions and answers from your own documents, menus and policies, so customers can just type the way they talk, in English, Hindi or a mix. We keep a human in the loop for anything sensitive and log every conversation so you can see what customers are really asking.</p>

<h2>How we usually build one</h2>
<ol>
  <li><strong>Map the conversations.</strong> We look at your real chats and list the questions that come up again and again.</li>
  <li><strong>Connect your systems.</strong> Sheets, CRM, booking calendar or payment gateway, so the bot can read and write real data.</li>
  <li><strong>Write and approve templates.</strong> For reminders and updates, submitted to Meta for approval.</li>
  <li><strong>Launch small, then tune.</strong> Start with the top questions, watch the conversations for a few weeks and improve the answers.</li>
</ol>

<h2>Is it worth it for you?</h2>
<p>If your team spends hours a day answering the same questions on WhatsApp, or leads go cold because nobody replied in time, a chatbot usually pays for itself quickly. If you get a handful of messages a week, a well-organised WhatsApp Business app with quick replies may be all you need. We're happy to tell you which one fits.</p>`,
  },
  {
    slug: 'ai-agents-vs-chatbots',
    seoTitle: 'AI Agents vs Chatbots: Which Does Your Business Need?', // shown in Google (≤60 chars); `title` is the on-page headline
    title: "AI agents vs chatbots: what's the difference, and which one do you need?",
    description: 'Chatbots answer questions. AI agents take actions. Here is the practical difference, examples of each, and how to pick the right one for your business.',
    date: '2026-11-26',
    author: 'Arunodoy Banerjee',
    tags: ['AI agents', 'Chatbots'],
    readMins: 5,
    body: `
<p class="doc-lead">"Chatbot" and "AI agent" get used as if they mean the same thing. They don't. The short version: a chatbot <em>talks</em>, an AI agent <em>does</em>. Knowing the difference saves you from paying for an agent when a chatbot would do, or buying a chatbot that can't finish the job.</p>

<h2>Chatbots answer</h2>
<p>A chatbot holds a conversation. It answers questions from a script or from a knowledge base, such as your FAQs, product docs or policies. Modern chatbots use large language models, so they understand natural questions instead of forcing people through menus. But at the end of the conversation, a person usually still has to do something.</p>
<p><strong>Good fits:</strong> website FAQs, product questions, "where is my order", first-line support.</p>

<h2>AI agents act</h2>
<p>An AI agent is given a goal and a set of tools it's allowed to use: your CRM, email, calendar, spreadsheets, internal APIs. It plans the steps, uses the tools, checks the result and carries on until the job is done or it needs a human.</p>
<p><strong>Good fits:</strong> qualifying a lead and booking the call, reading an invoice and entering it into your accounts, researching a prospect and drafting a personalised email, triaging support tickets and updating the right records.</p>

<h2>Side by side</h2>
<table>
  <thead><tr><th></th><th>Chatbot</th><th>AI agent</th></tr></thead>
  <tbody>
    <tr><td>Main job</td><td>Answer questions</td><td>Complete tasks</td></tr>
    <tr><td>Uses your tools</td><td>Rarely</td><td>Yes: CRM, email, calendar, APIs</td></tr>
    <tr><td>Steps per request</td><td>One reply</td><td>Several, planned on the fly</td></tr>
    <tr><td>Setup effort</td><td>Lower</td><td>Higher: integrations and guardrails</td></tr>
    <tr><td>Main risk</td><td>A wrong answer</td><td>A wrong action</td></tr>
  </tbody>
</table>

<h2>Guardrails matter more for agents</h2>
<p>Because agents take actions, we build them with limits: they can only use the tools they need, risky steps (sending money, deleting records, emailing a client) wait for human approval, and every action is logged so you can see exactly what happened. Agents also work best grounded in your own data, a pattern called retrieval-augmented generation (RAG), so their decisions are based on your documents rather than guesses.</p>

<h2>Which one should you start with?</h2>
<ul>
  <li>If people mostly <strong>ask the same questions</strong>, start with a chatbot.</li>
  <li>If people ask, and then someone on your team <strong>does the same steps every time</strong>, that's an agent.</li>
  <li>Many businesses start with a chatbot, then let it hand specific jobs to an agent once they trust it.</li>
</ul>
<p>The right first project is small and boring: one repetitive task, measured before and after. Once it works, you add the next one.</p>`,
  },
  {
    slug: 'custom-crm-vs-off-the-shelf',
    seoTitle: 'Custom CRM vs Off-the-Shelf: How to Decide | C3 Studio', // shown in Google (≤60 chars); `title` is the on-page headline
    title: 'Custom CRM vs off-the-shelf: how to decide (with a real example)',
    description: 'Should you buy a CRM or build your own? A practical checklist, the trade-offs on both sides and a real manufacturing CRM we built.',
    date: '2026-11-26',
    author: 'Arunodoy Banerjee',
    tags: ['CRM', 'Custom software'],
    readMins: 6,
    body: `
<p class="doc-lead">Every growing business hits the point where spreadsheets and WhatsApp groups stop being enough. Then comes the question: buy a CRM off the shelf, or build one around how you actually work? Both are the right answer for different businesses.</p>

<h2>When off-the-shelf is the right call</h2>
<p>Ready-made CRMs are fast to start, cheaper up front and come with years of polish. If your process looks like most sales processes (lead, call, proposal, close), a popular CRM will likely fit with a bit of configuration.</p>
<ul>
  <li>You need something running this month.</li>
  <li>Your workflow is fairly standard.</li>
  <li>You're happy to adapt your process to the tool.</li>
</ul>
<p>Watch for: per-user pricing that grows with your team, paid add-ons for features you assumed were included, and workflows you have to bend to fit the software.</p>

<h2>When custom makes sense</h2>
<p>A custom system is worth it when your operations are your advantage, and the software should follow them, not the other way round.</p>
<ul>
  <li>Your process spans <strong>sales and operations</strong>: leads, vendors, inventory, dispatch.</li>
  <li>You're paying for several tools and copying data between them by hand.</li>
  <li>You need specific rules, approvals or reports that generic tools can't do.</li>
  <li>You want to own your data and stop paying per seat as you grow.</li>
</ul>

<h2>A real example: one system instead of five spreadsheets</h2>
<p>We built a <strong>Manufacturing CRM &amp; Supply Chain Suite</strong> for a food manufacturer. Before it, sales, purchasing, stock and dispatch each lived in separate sheets and chats. The custom platform puts the whole workflow in one place:</p>
<ul>
  <li><strong>Sales CRM:</strong> leads, accounts and the sales pipeline.</li>
  <li><strong>Procurement:</strong> vendor directory, purchase orders and automated workflow alerts.</li>
  <li><strong>Inventory:</strong> live stock levels across warehouses, with low-stock alerts.</li>
  <li><strong>Logistics:</strong> dispatch schedules and delivery tracking.</li>
</ul>
<p>The value didn't come from any one feature. It came from everything finally talking to each other: an order touches sales, stock and dispatch without anyone re-typing it.</p>

<h2>A quick decision checklist</h2>
<ol>
  <li>Write down your process from first enquiry to delivered order. How many tools does it touch?</li>
  <li>Count the hours a week your team spends moving data between those tools.</li>
  <li>Try two or three off-the-shelf CRMs on your <em>real</em> process, not the demo.</li>
  <li>If they fit after configuration, buy. If you keep needing workarounds, consider building.</li>
</ol>

<h2>The middle path</h2>
<p>You don't have to choose all at once. Many teams start with an off-the-shelf CRM and add custom automations around it: a WhatsApp bot that feeds leads in, a script that syncs stock, an AI agent that writes follow-ups. When those workarounds start to outnumber the features, that's the signal to build.</p>`,
  },
]
