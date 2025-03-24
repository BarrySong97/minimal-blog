import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
export default function Demo() {
  return (
    <div>
      <Link href="/zh/demo/1">1</Link>
      <ViewTransition name="demo">
        <div>Demo</div>
      </ViewTransition>
    </div>
  );
}
