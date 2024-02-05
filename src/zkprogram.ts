import {
    Bool,
    Field,
    Poseidon,
    Provable,
    PublicKey,
    UInt64,
    verify,
    ZkProgram,
} from 'o1js';
import fs from "fs";

export let ProverX = ZkProgram({
    name: 'ProverX',
    publicOutput: UInt64,

    methods: {
        dummy: {
            privateInputs: [],
            method() {
                return UInt64.from(0);
            },
        }
    },
});

export class ProverProofX extends ZkProgram.Proof(ProverX) { }
