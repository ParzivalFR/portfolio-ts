interface TailwindProps {
  width?: number | string;
  height?: number | string;
}

const Tailwind = ({ width, height }: TailwindProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 512 64"
      version="1.1"
      preserveAspectRatio="xMidYMid"
    >
      <defs>
        <linearGradient
          x1="-2.77777778%"
          y1="32%"
          x2="100%"
          y2="67.5555556%"
          id="linearGradient-1"
        >
          <stop stopColor="#2298BD" offset="0%"></stop>
          <stop stopColor="#0ED7B5" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g>
        <path
          d="M52.8666139,-1.0658141e-14 C38.7688502,-1.0658141e-14 29.9577479,7.04888185 26.4333069,21.1466456 C31.7199683,14.0977637 37.88774,11.454433 44.9366218,13.2166535 C48.9584005,14.2220981 51.8329737,17.1397478 55.0147606,20.3695063 C60.1980384,25.6307134 66.1970285,31.7199683 79.2999208,31.7199683 C93.3976845,31.7199683 102.208787,24.6710865 105.733228,10.5733228 C100.446566,17.6222046 94.2787948,20.2655353 87.2299129,18.5033149 C83.2081342,17.4978702 80.333561,14.5802205 77.1517741,11.350462 C71.9684963,6.08925491 65.9695062,-1.0658141e-14 52.8666139,-1.0658141e-14 Z M26.4333069,31.7199683 C12.3355432,31.7199683 3.52444093,38.7688502 0,52.8666139 C5.28666139,45.817732 11.454433,43.1744013 18.5033149,44.9366218 C22.5250936,45.9420665 25.3996667,48.8597162 28.5814537,52.0894747 C33.7647315,57.3506818 39.7637215,63.4399367 52.8666139,63.4399367 C66.9643776,63.4399367 75.7754799,56.3910548 79.2999208,42.2932911 C74.0132594,49.342173 67.8454878,51.9855037 60.796606,50.2232832 C56.7748273,49.2178385 53.9002541,46.3001888 50.7184671,43.0704303 C45.5351894,37.8092232 39.5361993,31.7199683 26.4333069,31.7199683 Z"
          fill="url(#linearGradient-1)"
        ></path>
        <path
          d="M158.59201,26.7309264 L149.365806,26.7309264 L149.365806,44.5880938 C149.365806,49.350005 152.490811,49.2756002 158.59201,48.9779807 L158.59201,56.1952525 C146.240802,57.6833498 141.330081,54.2607261 141.330081,44.5880938 L141.330081,26.7309264 L134.484834,26.7309264 L134.484834,18.9928205 L141.330081,18.9928205 L141.330081,8.9990725 L149.365806,6.61811685 L149.365806,18.9928205 L158.59201,18.9928205 L158.59201,26.7309264 Z M193.762014,18.9928205 L201.797739,18.9928205 L201.797739,56.1952525 L193.762014,56.1952525 L193.762014,50.8381023 C190.934629,54.7815601 186.544742,57.1625158 180.741163,57.1625158 C170.622101,57.1625158 162.214352,48.6059564 162.214352,37.5940365 C162.214352,26.5077118 170.622101,18.0255573 180.741163,18.0255573 C186.544742,18.0255573 190.934629,20.406513 193.762014,24.2755659 L193.762014,18.9928205 Z M182.006045,49.4988148 C188.702483,49.4988148 193.762014,44.5136889 193.762014,37.5940365 C193.762014,30.6743842 188.702483,25.6892583 182.006045,25.6892583 C175.309608,25.6892583 170.250077,30.6743842 170.250077,37.5940365 C170.250077,44.5136889 175.309608,49.4988148 182.006045,49.4988148 Z M215.190615,13.4124557 C212.36323,13.4124557 210.056679,11.0315001 210.056679,8.27852013 C210.056679,5.4511353 212.36323,3.14458451 215.190615,3.14458451 C218.018,3.14458451 220.32455,5.4511353 220.32455,8.27852013 C220.32455,11.0315001 218.018,13.4124557 215.190615,13.4124557 Z M211.172752,56.1952525 L211.172752,18.9928205 L219.208477,18.9928205 L219.208477,56.1952525 L211.172752,56.1952525 Z M228.509085,56.1952525 L228.509085,1.87970183 L236.544811,1.87970183 L236.544811,56.1952525 L228.509085,56.1952525 Z M288.70262,18.9928205 L297.184775,18.9928205 L285.503211,56.1952525 L277.616296,56.1952525 L269.87819,31.1208134 L262.065679,56.1952525 L254.178764,56.1952525 L242.4972,18.9928205 L250.979354,18.9928205 L258.196626,44.6624986 L266.009137,18.9928205 L273.672838,18.9928205 L281.410944,44.6624986 L288.70262,18.9928205 Z M307.155027,13.4124557 C304.327642,13.4124557 302.021091,11.0315001 302.021091,8.27852013 C302.021091,5.4511353 304.327642,3.14458451 307.155027,3.14458451 C309.982411,3.14458451 312.288962,5.4511353 312.288962,8.27852013 C312.288962,11.0315001 309.982411,13.4124557 307.155027,13.4124557 Z M303.137164,56.1952525 L303.137164,18.9928205 L311.172889,18.9928205 L311.172889,56.1952525 L303.137164,56.1952525 Z M340.041977,18.0255573 C348.375321,18.0255573 354.32771,23.680327 354.32771,33.3529593 L354.32771,56.1952525 L346.291985,56.1952525 L346.291985,34.1714128 C346.291985,28.5166431 343.018171,25.5404486 337.95864,25.5404486 C332.675895,25.5404486 328.509223,28.6654529 328.509223,36.254749 L328.509223,56.1952525 L320.473497,56.1952525 L320.473497,18.9928205 L328.509223,18.9928205 L328.509223,23.7547318 C330.964583,19.8856789 334.982446,18.0255573 340.041977,18.0255573 Z M392.423001,4.11184775 L400.458726,4.11184775 L400.458726,56.1952525 L392.423001,56.1952525 L392.423001,50.8381023 C389.595616,54.7815601 385.205729,57.1625158 379.40215,57.1625158 C369.283088,57.1625158 360.875338,48.6059564 360.875338,37.5940365 C360.875338,26.5077118 369.283088,18.0255573 379.40215,18.0255573 C385.205729,18.0255573 389.595616,20.406513 392.423001,24.2755659 L392.423001,4.11184775 Z M380.667032,49.4988148 C387.36347,49.4988148 392.423001,44.5136889 392.423001,37.5940365 C392.423001,30.6743842 387.36347,25.6892583 380.667032,25.6892583 C373.970595,25.6892583 368.911064,30.6743842 368.911064,37.5940365 C368.911064,44.5136889 373.970595,49.4988148 380.667032,49.4988148 Z M427.393287,57.1625158 C416.158152,57.1625158 407.750403,48.6059564 407.750403,37.5940365 C407.750403,26.5077118 416.158152,18.0255573 427.393287,18.0255573 C434.684964,18.0255573 441.009377,21.8202054 443.985572,27.6237848 L437.065919,31.6416474 C435.429012,28.1446188 431.783174,25.9124729 427.318882,25.9124729 C420.771254,25.9124729 415.786128,30.8975988 415.786128,37.5940365 C415.786128,44.2904743 420.771254,49.2756002 427.318882,49.2756002 C431.783174,49.2756002 435.429012,46.9690494 437.214729,43.5464257 L444.134381,47.4898834 C441.009377,53.3678677 434.684964,57.1625158 427.393287,57.1625158 Z M457.378447,29.2606918 C457.378447,36.0315344 477.393355,31.9392669 477.393355,45.7041667 C477.393355,53.1446531 470.920132,57.1625158 462.884407,57.1625158 C455.443921,57.1625158 450.08677,53.8142969 447.705815,48.4571467 L454.625467,44.439284 C455.815945,47.7875029 458.792139,49.7964342 462.884407,49.7964342 C466.45584,49.7964342 469.20882,48.6059564 469.20882,45.6297618 C469.20882,39.007729 449.193912,42.7279722 449.193912,29.4095015 C449.193912,22.4154443 455.220706,18.0255573 462.810002,18.0255573 C468.911201,18.0255573 473.970732,20.8529421 476.574902,25.7636632 L469.804059,29.5583112 C468.464772,26.6565215 465.860602,25.317234 462.810002,25.317234 C459.908212,25.317234 457.378447,26.5821167 457.378447,29.2606918 Z M491.679089,29.2606918 C491.679089,36.0315344 511.693998,31.9392669 511.693998,45.7041667 C511.693998,53.1446531 505.220775,57.1625158 497.185049,57.1625158 C489.744563,57.1625158 484.387413,53.8142969 482.006457,48.4571467 L488.926109,44.439284 C490.116587,47.7875029 493.092782,49.7964342 497.185049,49.7964342 C500.756483,49.7964342 503.509463,48.6059564 503.509463,45.6297618 C503.509463,39.007729 483.494554,42.7279722 483.494554,29.4095015 C483.494554,22.4154443 489.521348,18.0255573 497.110644,18.0255573 C503.211843,18.0255573 508.271374,20.8529421 510.875544,25.7636632 L504.104702,29.5583112 C502.765414,26.6565215 500.161244,25.317234 497.110644,25.317234 C494.208855,25.317234 491.679089,26.5821167 491.679089,29.2606918 Z"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  );
};

export default Tailwind;
