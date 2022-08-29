import type { SVGProps } from 'react';

export function PowerOffIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 12.85q-.425 0-.712-.288Q11 12.275 11 11.85v-8q0-.425.288-.713q.287-.287.712-.287t.713.287q.287.288.287.713v8q0 .425-.287.712q-.288.288-.713.288Zm0 8q-1.875 0-3.512-.712q-1.638-.713-2.85-1.926Q4.425 17 3.712 15.363Q3 13.725 3 11.85q0-1.725.625-3.3q.625-1.575 1.8-2.85q.275-.3.7-.3q.425 0 .725.3q.275.275.25.687q-.025.413-.3.738q-.875.975-1.337 2.187Q5 10.525 5 11.85q0 2.925 2.038 4.962Q9.075 18.85 12 18.85t4.962-2.038Q19 14.775 19 11.85q0-1.325-.475-2.563q-.475-1.237-1.35-2.212q-.275-.3-.287-.7q-.013-.4.262-.675q.3-.3.725-.3t.7.3q1.175 1.275 1.8 2.85q.625 1.575.625 3.3q0 1.875-.712 3.513q-.713 1.637-1.925 2.849q-1.213 1.213-2.85 1.926q-1.638.712-3.513.712Z"
      ></path>
    </svg>
  );
}
