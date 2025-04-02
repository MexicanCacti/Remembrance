import RouteButton from '../components/RouteButton';

export default function Home() {
  return (
    <div className="homeLayout">
      <title>It's time to edit!</title>
      
      <h1 className="dailyMessage">It's time to edit!</h1>

      <section className="navButtons">
        <RouteButton
          text = "New Set"
          dest = "newset"
        />
        <RouteButton
        text = "Review Set"
        dest = "reviewset"
        />
        <RouteButton
        text = "Edit Set"
        dest = "editset"
        />
      </section>

    </div>
  );
}
