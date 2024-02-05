import { verify, JsonProof } from "o1js";
import fs from "fs/promises";
import { ProverX, ProverProofX, verifyProof } from "./zkprogram";

export async function readProofFromFileAndVerify() {
  try {
    // read from file
    const str2 = await fs.readFile("./proof.json", "utf8");
    //console.log("str2: " + str2);

    const ok2step2 = await verifyProof(str2);
    console.log("ok2step2: " + ok2step2);
  } catch (error) {
    console.error(error);
  }
}

// step2
async function main() {
  await readProofFromFileAndVerify();
}

main().catch((error) => {
  console.error(error);
});
