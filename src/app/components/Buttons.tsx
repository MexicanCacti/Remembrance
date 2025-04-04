import Link from 'next/link';

export function RouteButton({text, dest=""} : {text : string, dest : string}){
    return(
        /* Link better for simple navigation */
        <Link href={`/${dest}`}>
        <button>{text}</button>
        </Link>
    );
}

export function SubmitButton({ text = "Submit", onClick }: { text: string, onClick: () => void }) {
    return(
        <button onClick={onClick}>{text}</button>
    );
}