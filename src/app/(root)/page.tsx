import React from "react";
import FeaturedSection from "./_modules/FeaturedSection";
import LatestPosts from "./_modules/LatestPosts";
import PremiumContent from "./_modules/PremiumContent";

const Home = () => {
  return (
    <div>
      <FeaturedSection />
      <LatestPosts />
      <PremiumContent />
    </div>
  );
};

export default Home;
