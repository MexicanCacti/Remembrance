import Link from 'next/link'


function RouteButton({text, dest} : {text : string, dest : string}){
  return(
    /* Link better for simple navigation */
    <Link href={`/${dest}`}>
      <button>{text}</button>
    </Link>
  );
}


export default function Home() {
  return (
    <div className="homeLayout">
      <title>It's time to create!</title>
      
      <h1 className="dailyMessage">It's time to create!</h1>

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
