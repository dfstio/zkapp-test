import {
  Field,
  ZkProgram,
  verify,
  JsonProof,
  state,
  State,
  method,
  SmartContract,
  VerificationKey,
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

let vk: VerificationKey;

export async function verifyProof(str: string) {
  //await MySmartContract.compile();
  vk = (await ProverX.compile({ forceRecompile: true })).verificationKey;
  const ok = await verify(JSON.parse(str) as JsonProof, vk);
  return ok;
}
