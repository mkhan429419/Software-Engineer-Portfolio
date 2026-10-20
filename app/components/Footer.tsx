export default function Footer() {
  return (
    <footer className="bg-paper">
      <div className="section-wrap py-8 md:py-10">
        <p className="text-center font-mono text-[15px] leading-snug text-ink md:text-[17px] lg:text-[19px] 2xl:text-[21px]">
          © {new Date().getFullYear()} Maheen Akhtar Khan
        </p>
      </div>
    </footer>
  );
}
