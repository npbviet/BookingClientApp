import FeaturedProperties from "./FeaturedProperties";
import PropertyList from "./PropertyList";
import Featured from "./Featured";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div>
      <div className={styles.homeContainer}>
        <Featured />
        <h1 className={styles.homeTitle}>Browse by property type</h1>
        <PropertyList />
        <h1 className={styles.homeTitle}>Homes guests love</h1>
        <FeaturedProperties />
      </div>
    </div>
  );
};

export default Home;
