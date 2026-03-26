import { useRef, useState, useEffect } from "react";
import Header from "./Header";
import Card from "./Card";
import TrackList from "./TrackList";
import { featuredPlaylists, recentlyPlayed, madeForYou, chartTracks } from "../data/mockData";
import "./MainContent.css";

function Section({ title, children }) {
  return (
    <section className="section">
      <div className="section__header">
        <h2 className="section__title">{title}</h2>
        <button className="section__see-all">See all</button>
      </div>
      {children}
    </section>
  );
}

function CardGrid({ items }) {
  return (
    <div className="card-grid">
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

function QuickPlayItem({ item }) {
  return (
    <div className="quick-play__item">
      <img
        src={item.image}
        alt={item.title}
        className="quick-play__image"
        onError={(e) => {
          e.target.src = `https://via.placeholder.com/48x48/282828/1DB954?text=♪`;
        }}
      />
      <span className="quick-play__title">{item.title}</span>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function MainContent() {
  const scrollRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 60);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="main-content" ref={scrollRef}>
      <Header scrolled={scrolled} />

      <div className="main-content__inner">
        {/* Greeting + Quick Access */}
        <section className="quick-access">
          <h2 className="quick-access__title">{getGreeting()}</h2>
          <div className="quick-access__grid">
            {recentlyPlayed.map((item) => (
              <QuickPlayItem key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Featured Playlists */}
        <Section title="Featured Playlists">
          <CardGrid items={featuredPlaylists} />
        </Section>

        {/* Recently Played */}
        <Section title="Recently played">
          <CardGrid items={recentlyPlayed} />
        </Section>

        {/* Made for You */}
        <Section title="Made for you">
          <CardGrid items={madeForYou} />
        </Section>

        {/* Top Charts */}
        <Section title="Top charts">
          <TrackList tracks={chartTracks} />
        </Section>
      </div>
    </div>
  );
}
