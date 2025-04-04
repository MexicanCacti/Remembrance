import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ReviewSelect() {
    const router = useRouter();

    useEffect(() => {
        router.push(`/selectset?`);
    }, []);

    return (
        <div></div>
    );
}