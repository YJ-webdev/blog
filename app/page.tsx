import { Preview } from './components/preview';
import { PreviewMain } from './components/preview-main';

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-7 mt-6 md:grid-cols-2 mb-20">
      <div className="col-span-1 md:col-span-2">
        <PreviewMain
          slug="the-impact-of-digital-transformation-on-modern-businesses"
          title="The Impact of Digital Transformation on Modern Businesses"
          content="In today's fast-paced world, digital transformation is not just a buzzword but a vital business strategy. As technology continues to evolve, it has reshaped how companies operate, interact with customers, and manage their workforce. From automation to data-driven decision-making, businesses are leveraging digital tools to stay competitive and relevant."
          image="https://images.unsplash.com/photo-1740165886179-c2be3d6447ca?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          publishedAt={new Date()}
        />
        <hr className="w-full mt-5 border-zinc-200 dark:border-zinc-700" />
      </div>
      <Preview
        slug="the-beauty-and-challenges-of-cold-weather"
        title="The Beauty and Challenges of Cold Weather"
        content="Cold weather is an integral part of nature’s cycle, bringing crisp air, frosty mornings, and breathtaking winter landscapes. For some, it's a magical time of snowflakes and cozy moments by the fire; for others, it presents challenges like icy roads and freezing temperatures. Whether you love or dread the cold, understanding its effects and how to prepare for it is essential."
        image="https://images.unsplash.com/photo-1736549188891-ec697fccc8a3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        publishedAt={new Date()}
      />
      <Preview
        slug="the-importance-of-a-good-bed"
        title="The Importance of a Good Bed"
        content="A bed is more than just a piece of furniture—it’s a place of rest, comfort, and rejuvenation. Whether it’s a simple mattress on the floor or a luxurious king-sized bed, the right sleeping setup can make a significant difference in overall well-being."
        image="https://images.unsplash.com/photo-1737467016100-68cd7759d93c?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        publishedAt={new Date()}
      />
      <Preview
        slug="the-joy-of-hiking-exploring-nature-on-foot"
        title="The Joy of Hiking: Exploring Nature on Foot"
        content="Hiking is one of the best ways to connect with nature, improve physical fitness, and clear the mind. Whether it’s a short walk through a local trail or a challenging mountain trek, hiking offers an escape from the hustle and bustle of daily life."
        image="https://images.unsplash.com/photo-1739369122285-8560a5eb18fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNTN8fHxlbnwwfHx8fHw%3D"
        publishedAt={new Date()}
      />
      <Preview
        slug="how-to-save-money-when-paying-with-a-card-in-shops"
        title="How to Save Money When Paying with a Card in Shops"
        content="Using a debit or credit card for shopping is convenient, but without careful spending, costs can add up quickly. Fortunately, there are smart ways to save money while using your card for purchases."
        image="https://images.unsplash.com/photo-1726137569971-cdfa45c3138e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        publishedAt={new Date()}
      />
    </div>
  );
}
