export function CallToAction() {
  return (
    <section data-scroll-bg="red" className="site-section relative overflow-hidden text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_20%_30%,rgb(255_0_0/0.6),transparent_60%),radial-gradient(700px_400px_at_80%_80%,rgb(71_0_0/0.7),transparent_60%)]"
      />
      <div className="container-gym relative">
        <h2
          data-poster
          className="mb-8 origin-[50%_80%] font-poster text-[clamp(64px,18vw,240px)] leading-[0.86] font-normal tracking-[-0.04em]"
        >
          Bora
          <br />
          treinar?
        </h2>
        <a data-reveal href="#planos" className="btn-primary btn-lg">
          Quero me matricular →
        </a>
      </div>
    </section>
  )
}
