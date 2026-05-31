import React from 'react';

const Projects: React.FC = () => {
  return (
    <section className="bg-black py-section-gap overflow-hidden" id="projects">
      <div className="max-w-max-width mx-auto px-gutter mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="font-label-caps text-brand-orange mb-4 block">MONUMENTAL PROGRESS</span>
          <h2 className="font-headline-h1 text-white">FEATURED PROJECTS</h2>
        </div>
        <button className="px-8 py-3 bg-white text-black font-label-caps hover:bg-brand-orange hover:text-white transition-colors">
          ALL PROJECTS
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 h-auto md:h-[600px] gap-1 px-1">
        <div className="md:col-span-2 relative group overflow-hidden cursor-pointer h-[400px] md:h-full">
          <img alt="Statue of Unity Project" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="/public/ChatGPT Image May 31, 2026, 06_54_48 PM.png" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
          <div className="absolute bottom-10 left-10 text-white">
            <span className="font-label-caps text-brand-orange mb-2 block">CIVIL INFRASTRUCTURE</span>
            <h3 className="font-headline-h2 text-3xl">STATUE OF UNITY PRECINCT</h3>
            <p className="font-body-md text-white/70 max-w-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
              Comprehensive landscape and civil engineering works for India's monumental landmark.
            </p>
          </div>
        </div>
        <div className="relative group overflow-hidden cursor-pointer h-[400px] md:h-full">
          <img alt="Railway Infrastructure" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAujMlGIvhO3OBMs-Oal-1u78VqPG2pPaLYXvtTq1CDhgcWoNaMHeWh_lhqOVQMATpztWLU_TcrAG7koMa_hJ3cO6qByqEbLWIZ9jh1D_jnTeXsEaf18W4_BMOtygWd8bkn_gfNeNZyGvI0jENjofZrGlr3qN_p5eNsPdwO5YVRtFOXzlWu3jwfa0g4QKoB__qUwPsiovw8dJq3vvq3x00k_8wZDv--9VEqF_ItH7szfuIwk2wRCRNxzSGsTgzf-HrjHbgfxFm8GrCm" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors"></div>
          <div className="absolute bottom-10 left-8 text-white">
            <span className="font-label-caps text-brand-orange mb-2 block">RAILWAYS</span>
            <h3 className="font-headline-h2 text-2xl">WESTERN RAILWAY UPGRADE</h3>
          </div>
        </div>
        <div className="relative group overflow-hidden cursor-pointer h-[400px] md:h-full">
          <img alt="Telecom Project" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjcbTyGUyi9_b4Iu4homPunxtXsLCFK2dBVzgNtXsF7XViViPgENxWr4hPPTJ74HWv1WzaFhLUhjX-bEjoX9sClpccaWPUfjEsizJ5DtqAKecWLQNg7f5JDQvOzdpYKGtoAHIidtaPGYF_DzPtryjVAituNfo2VaATfbxOoge-jWqxJfMnK72JsxduSxf-KLr6nNzbB1lcj-M-WAFkZVOgiq9bOKqaBhy-Fevn6b50StyGMqIunIPm__vHD94ARDMioHnAu830bUAR" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors"></div>
          <div className="absolute bottom-10 left-8 text-white">
            <span className="font-label-caps text-brand-orange mb-2 block">TELECOM</span>
            <h3 className="font-headline-h2 text-2xl">PAN-INDIA 5G TOWER ROLLOUT</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
