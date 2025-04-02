import Link from 'next/link';

export default function RouteButton({text, dest} : {text : string, dest : string}){
    return(
      /* Link better for simple navigation */
      <Link href={`/${dest}`}>
        <button>{text}</button>
      </Link>
    );
  }