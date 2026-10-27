// Native <dialog>: showModal() makes the page inert (focus trap) and Esc closes it.
const gallery = document.querySelector<HTMLElement>('[data-gallery]');
const dialog = document.querySelector<HTMLDialogElement>('dialog.lightbox');

if (gallery && dialog) {
  const links = [...gallery.querySelectorAll<HTMLAnchorElement>('a[data-full]')];
  const img = dialog.querySelector('img')!;
  const count = dialog.querySelector<HTMLElement>('.lb-count')!;
  let index = 0;
  let opener: HTMLElement | null = null;

  const show = (i: number) => {
    index = (i + links.length) % links.length;
    const link = links[index];
    img.src = link.dataset.full!;
    img.alt = link.querySelector('img')?.alt ?? '';
    count.textContent = `${index + 1} / ${links.length}`;
    // Warm the next image so arrowing forward feels instant.
    new Image().src = links[(index + 1) % links.length].dataset.full!;
  };

  gallery.addEventListener('click', (e) => {
    const link = (e.target as Element).closest<HTMLAnchorElement>('a[data-full]');
    if (!link || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    opener = link;
    show(links.indexOf(link));
    dialog.showModal();
  });

  dialog.querySelector('.lb-prev')!.addEventListener('click', () => show(index - 1));
  dialog.querySelector('.lb-next')!.addEventListener('click', () => show(index + 1));
  dialog.querySelector('.lb-close')!.addEventListener('click', () => dialog.close());
  // Click on the backdrop (outside the image and buttons) closes.
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
  });
  dialog.addEventListener('close', () => {
    img.removeAttribute('src');
    opener?.focus();
  });

  let startX = 0;
  let startY = 0;
  dialog.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  dialog.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
  }, { passive: true });
}
