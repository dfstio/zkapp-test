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
import { ProverX, ProverProofX } from './zkprogram';

export async function genProofAndSerAndVerify() {

    const { verificationKey: ProverX_VK } = await ProverX.compile();
    console.log('ProverX_VK: ' + ProverX_VK.hash);

    const proof = await ProverX.dummy();

    try {
        const ok = await verify(proof, ProverX_VK);
        console.log('ok: ' + ok);

        const proofStr = JSON.stringify(proof.toJSON());
        console.log('proofStr: ' + proofStr);
        // write to file
        fs.writeFileSync('./proof.json', proofStr);

        // read from file
        const str2 = fs.readFileSync('./proof.json', 'utf8');
        const proof2 = ProverProofX.fromJSON(JSON.parse(str2));
        const ok2 = await verify(proof2, ProverX_VK);
        console.log('ok2: ' + ok2);
    } catch (error) {
        console.error(error);
    }
}

// step1:
await genProofAndSerAndVerify();
