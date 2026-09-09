export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 px-[5vw] py-10 text-xs font-semibold uppercase tracking-wider text-muted">
      <div>© {new Date().getFullYear()} Treutis</div>
      <div className="flex gap-5">
        <a href="#" className="hover:text-red">
          Shipping
        </a>
        <a href="#" className="hover:text-red">
          Feedback
        </a>
        <a href="/admin" className="hover:text-red">
          Admin
        </a>
      </div>
    </footer>
  );
}
