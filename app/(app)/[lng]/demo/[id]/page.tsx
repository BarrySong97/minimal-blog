import { motion } from "framer-motion";
import { unstable_ViewTransition as ViewTransition } from "react";
export default async function Demo() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div>
      <div>222</div>
      <ViewTransition name="demo">
        <div className="ml-[100px]">Demo</div>
      </ViewTransition>
    </div>
  );
}
