import { verify, JsonProof, Field } from "o1js";
import fs from "fs/promises";
import { ProverX, ProverProofX, verifyProof } from "./zkprogram";

export async function genProofAndSerAndVerify() {
  const { verificationKey: ProverX_VK } = await ProverX.compile();

  const proof = await ProverX.mymethod(Field(2), Field(2));

  try {
    const ok = await verify(proof, ProverX_VK);
    console.log("ok: " + ok);

    const proofStr = JSON.stringify(proof.toJSON(), null, 2);
    //console.log("proofStr: " + proofStr);
    // write to file
    await fs.writeFile("./proof.json", proofStr);

    // read from file
    const str2 = await fs.readFile("./proof.json", "utf8");
    const proof2: ProverProofX = ProverProofX.fromJSON(
      JSON.parse(str2) as JsonProof
    ) as ProverProofX;
    console.log("proof2: ", proof2);
    const ok2 = await verify(proof2, ProverX_VK);
    console.log("ok2: " + ok2);
    const ok3 = await verifyProof(str2);
    console.log("ok3: " + ok3);
  } catch (error) {
    console.error(error);
  }
}

// step1:
async function main() {
  await genProofAndSerAndVerify();
}

main().catch((error) => {
  console.error(error);
});
