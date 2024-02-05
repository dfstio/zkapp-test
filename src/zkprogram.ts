import {
  Field,
  ZkProgram,
  verify,
  JsonProof,
  state,
  State,
  method,
  SmartContract,
} from "o1js";

export const ProverX = ZkProgram({
  name: "ProverX",
  publicInput: Field,

  methods: {
    mymethod: {
      privateInputs: [Field],
      method(a: Field, b: Field) {
        a.assertEquals(b);
      },
    },
  },
});

export class ProverProofX extends ZkProgram.Proof(ProverX) {}

class MySmartContract extends SmartContract {
  @state(Field) key = State<Field>();
  @state(Field) value = State<Field>();

  @method mint(value: Field) {
    this.value.set(value);
  }
}

export async function verifyProof(str: string) {
  await MySmartContract.compile();
  const { verificationKey: ProverX_VK } = await ProverX.compile();
  const proof: ProverProofX = ProverProofX.fromJSON(
    JSON.parse(str) as JsonProof
  ) as ProverProofX;
  console.log("proof: ", proof);
  const ok = await verify(proof, ProverX_VK);
  return ok;
}
