import type { ServiceId } from "./content";

/** تمرير الخدمة من بطاقة الخدمة إلى نموذج الحجز بلا تنقّل ولا معاملات URL. */
export const BOOK_EVENT = "valeriia:book";

export function requestBooking(service: ServiceId) {
  window.dispatchEvent(new CustomEvent<ServiceId>(BOOK_EVENT, { detail: service }));
}
