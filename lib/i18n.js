// Lightweight client-side i18n: a flat dictionary keyed by string id, each
// entry holding an `es` and `en` value (or a function for pluralized /
// interpolated strings). No routing involved — see LanguageProvider.
export const dict = {
  // Header / nav
  nav_search: { es: "Buscar vuelos", en: "Search flights" },
  nav_map: { es: "Mapa de precios", en: "Price map" },
  nav_bookings: { es: "Mis reservas", en: "My bookings" },

  // Footer
  footer_disclaimer_title: {
    es: "AeroFind es un proyecto de portfolio, no un sitio de venta de pasajes real.",
    en: "AeroFind is a portfolio project, not a real flight-booking site.",
  },
  footer_disclaimer_body: {
    es: "Todas las aerolíneas, vuelos, precios y disponibilidad son ficticios y se generan en el navegador. No se procesan pagos ni reservas reales — no ingreses datos reales de tarjetas ni documentos.",
    en: "All airlines, flights, prices and availability are fictional and generated in the browser. No real payments or bookings are processed — don't enter real card or ID details.",
  },
  footer_made_by: { es: "Hecho por", en: "Made by" },
  footer_code_at: { es: "código en", en: "code on" },

  // Home
  home_badge: {
    es: "Proyecto demo de portfolio · datos ficticios",
    en: "Portfolio demo project · fictional data",
  },
  home_title: { es: 'Buscá y "reservá" vuelos en segundos', en: 'Search and "book" flights in seconds' },
  home_subtitle: {
    es: "AeroFind es un buscador de vuelos ficticio construido como pieza de portfolio: aerolíneas, precios y disponibilidad se generan en el momento, no hay backend ni pagos reales.",
    en: "AeroFind is a fictional flight search engine built as a portfolio piece: airlines, prices and availability are generated on the fly, there's no backend or real payments.",
  },
  home_card1_title: { es: "Precios simulados", en: "Simulated prices" },
  home_card1_text: {
    es: "Cada búsqueda genera tarifas y horarios de forma determinística a partir del origen, destino y fecha.",
    en: "Each search deterministically generates fares and schedules from the origin, destination and date.",
  },
  home_card2_title: { es: "Sin datos reales", en: "No real data" },
  home_card2_text: {
    es: "No se guarda información en ningún servidor: las reservas quedan solo en tu navegador (localStorage).",
    en: "Nothing is stored on any server: bookings stay only in your browser (localStorage).",
  },
  home_card3_title: { es: "Aerolíneas ficticias", en: "Fictional airlines" },
  home_card3_text: {
    es: "Aurora Airways, Cóndor Azul y otras marcas inventadas para este demo — ninguna existe en la realidad.",
    en: "Aurora Airways, Cóndor Azul and other brands invented for this demo — none of them are real.",
  },
  home_map_title: { es: "Mapa de precios", en: "Price map" },
  home_map_fullscreen: { es: "Ver pantalla completa", en: "View fullscreen" },
  home_map_subtitle: {
    es: "Precio estimado más barato a cada destino, elegí origen y fecha.",
    en: "Cheapest estimated price to each destination — pick an origin and date.",
  },

  // Search form
  form_oneway: { es: "Solo ida", en: "One way" },
  form_roundtrip: { es: "Ida y vuelta", en: "Round trip" },
  form_origin: { es: "Origen", en: "Origin" },
  form_destination: { es: "Destino", en: "Destination" },
  form_swap: { es: "Intercambiar origen y destino", en: "Swap origin and destination" },
  form_passengers: { es: "Pasajeros", en: "Passengers" },
  form_passenger_count: {
    es: (n) => `${n} ${n === 1 ? "pasajero" : "pasajeros"}`,
    en: (n) => `${n} ${n === 1 ? "passenger" : "passengers"}`,
  },
  form_fewer_passengers: { es: "Menos pasajeros", en: "Fewer passengers" },
  form_more_passengers: { es: "Más pasajeros", en: "More passengers" },
  form_depart_date: { es: "Fecha de ida", en: "Departure date" },
  form_roundtrip_dates: { es: "Fechas de ida y vuelta", en: "Departure & return dates" },
  form_cabin: { es: "Clase", en: "Class" },
  form_economy: { es: "Económica", en: "Economy" },
  form_business: { es: "Business", en: "Business" },
  form_searching: { es: "Buscando…", en: "Searching…" },
  form_search: { es: "Buscar vuelos", en: "Search flights" },
  form_error_same_airport: {
    es: "El origen y el destino no pueden ser el mismo aeropuerto.",
    en: "Origin and destination can't be the same airport.",
  },
  form_error_no_depart: { es: "Elegí la fecha de ida.", en: "Pick a departure date." },
  form_error_no_return: { es: "Elegí la fecha de vuelta.", en: "Pick a return date." },
  form_error_return_before_depart: {
    es: "La fecha de vuelta no puede ser anterior a la de ida.",
    en: "The return date can't be before the departure date.",
  },

  // Fare date picker
  picker_choose_date: { es: "Elegí una fecha", en: "Pick a date" },
  picker_choose_return: { es: "Elegí vuelta", en: "pick return" },
  picker_choose_dates: { es: "Elegí las fechas", en: "Pick your dates" },
  picker_prev_month: { es: "Mes anterior", en: "Previous month" },
  picker_next_month: { es: "Mes siguiente", en: "Next month" },
  level_low: { es: "Económico", en: "Cheap" },
  level_mid: { es: "Medio", en: "Average" },
  level_high: { es: "Caro", en: "Expensive" },
  legend_origin: { es: "Tu origen", en: "Your origin" },

  // Filters panel
  filters_title: { es: "Filtros", en: "Filters" },
  filters_stops: { es: "Escalas", en: "Stops" },
  filters_stops_any: { es: "Todas", en: "Any" },
  filters_stops_direct: { es: "Solo directos", en: "Direct only" },
  filters_max_price: { es: "Precio máximo", en: "Max price" },
  filters_no_limit: { es: "Sin límite", en: "No limit" },
  filters_airline: { es: "Aerolínea", en: "Airline" },
  filters_sort_by: { es: "Ordenar por", en: "Sort by" },
  filters_sort_price: { es: "Precio (menor a mayor)", en: "Price (low to high)" },
  filters_sort_duration: { es: "Duración (menor a mayor)", en: "Duration (shortest first)" },
  filters_sort_departure: { es: "Horario de salida", en: "Departure time" },

  // Flight card / detail
  flight_number: { es: "Vuelo", en: "Flight" },
  flight_direct: { es: "Directo", en: "Direct" },
  flight_stops: { es: (n) => `${n} escala${n > 1 ? "s" : ""}`, en: (n) => `${n} stop${n > 1 ? "s" : ""}` },
  flight_carry_on: { es: "1 equipaje de mano incluido", en: "1 carry-on included" },
  flight_seats_available: { es: (n) => `${n} asientos disponibles`, en: (n) => `${n} seats available` },
  flight_seats_left: { es: (n) => `${n} restantes`, en: (n) => `${n} left` },
  flight_per_passenger: { es: "por pasajero", en: "per passenger" },
  flight_view_detail: { es: "Ver detalle", en: "View details" },
  flight_selecting: { es: "Seleccionando…", en: "Selecting…" },
  flight_selected: { es: "Seleccionado", en: "Selected" },
  flight_select: { es: "Seleccionar", en: "Select" },
  detail_luggage: { es: "Equipaje", en: "Luggage" },
  detail_luggage_value: {
    es: "1 de mano incluido · bodega opcional",
    en: "1 carry-on included · checked bag optional",
  },
  detail_seats_available: { es: "Asientos disponibles", en: "Seats available" },
  detail_changes: { es: "Cambios", en: "Changes" },
  detail_changes_value: {
    es: "Permitidos con cargo, hasta 24h antes (simulado)",
    en: "Allowed for a fee, up to 24h before (simulated)",
  },
  detail_cancellation: { es: "Cancelación", en: "Cancellation" },
  detail_cancellation_value: {
    es: "Reembolsable parcialmente (simulado)",
    en: "Partially refundable (simulated)",
  },
  detail_price_per_passenger: { es: "Precio por pasajero", en: "Price per passenger" },
  detail_search_this_flight: { es: "Buscar este vuelo", en: "Search this flight" },
  detail_generated_note: {
    es: "Los datos de este vuelo son generados automáticamente para esta demo.",
    en: "This flight's data is generated automatically for this demo.",
  },
  detail_not_found: {
    es: "No encontramos ese vuelo.",
    en: "We couldn't find that flight.",
  },

  // Common
  common_back: { es: "Volver", en: "Back" },
  common_back_to_home: { es: "Volver al inicio", en: "Back to home" },
  common_search_flights: { es: "Buscar vuelos", en: "Search flights" },

  // Search results page
  results_outbound: { es: "Vuelos de ida", en: "Outbound flights" },
  results_return: { es: "Vuelos de vuelta", en: "Return flights" },
  results_modify_search: { es: "Modificar búsqueda", en: "Modify search" },
  results_hide: { es: "Ocultar", en: "Hide" },
  results_mobile_filters: { es: "Filtros", en: "Filters" },
  results_no_match: {
    es: "No hay vuelos que coincidan con los filtros seleccionados.",
    en: "No flights match the selected filters.",
  },
  results_missing_search: { es: "Faltan datos de búsqueda.", en: "Missing search data." },
  results_estimated_total: { es: "Total estimado", en: "Estimated total" },
  results_confirming: { es: "Confirmando…", en: "Confirming…" },
  results_continue: { es: "Continuar", en: "Continue" },

  // Booking flow
  step_passengers: { es: "Pasajeros", en: "Passengers" },
  step_seats: { es: "Asientos", en: "Seats" },
  step_pay: { es: "Pago", en: "Payment" },
  booking_passenger_n: { es: (n) => `Pasajero ${n}`, en: (n) => `Passenger ${n}` },
  booking_first_name: { es: "Nombre", en: "First name" },
  booking_last_name: { es: "Apellido", en: "Last name" },
  booking_document: { es: "Documento", en: "ID / passport" },
  booking_birth_date: { es: "Fecha de nacimiento", en: "Date of birth" },
  booking_contact_email: { es: "Email de contacto", en: "Contact email" },
  booking_error_passenger_fields: {
    es: "Completá todos los campos de cada pasajero.",
    en: "Fill in every field for each passenger.",
  },
  booking_continue_seats: { es: "Continuar a selección de asientos", en: "Continue to seat selection" },
  seatmap_outbound: { es: "Ida", en: "Outbound" },
  seatmap_return: { es: "Vuelta", en: "Return" },
  seatmap_available: { es: "Disponible", en: "Available" },
  seatmap_selected: { es: "Seleccionado", en: "Selected" },
  seatmap_occupied: { es: "Ocupado", en: "Occupied" },
  booking_error_seats: {
    es: "Seleccioná un asiento por pasajero en cada tramo.",
    en: "Select one seat per passenger on each leg.",
  },
  common_continue_to_payment: { es: "Continuar al pago", en: "Continue to payment" },
  payment_disclaimer: {
    es: "Este es un pago simulado para una demo de portfolio. No ingreses datos reales de tu tarjeta.",
    en: "This is a simulated payment for a portfolio demo. Don't enter your real card details.",
  },
  payment_card_name: { es: "Nombre en la tarjeta", en: "Name on card" },
  payment_card_number: { es: "Número (simulado)", en: "Number (simulated)" },
  payment_expiry: { es: "Vencimiento", en: "Expiry" },
  payment_cvv: { es: "CVV", en: "CVV" },
  payment_terms: {
    es: "Entiendo que esta es una reserva y un pago simulados, sin validez real, creados solo para una demo de portfolio.",
    en: "I understand this is a simulated booking and payment, with no real validity, created only for a portfolio demo.",
  },
  booking_error_payment: {
    es: "Completá los datos de pago simulados.",
    en: "Fill in the simulated payment details.",
  },
  booking_error_terms: {
    es: "Tenés que aceptar que esta es una reserva simulada.",
    en: "You need to accept that this is a simulated booking.",
  },
  common_back_button: { es: "Atrás", en: "Back" },
  booking_confirm: { es: "Confirmar reserva simulada", en: "Confirm simulated booking" },
  summary_title: { es: "Resumen", en: "Summary" },
  summary_passenger_count: {
    es: (n) => `${n} pasajero${n > 1 ? "s" : ""}`,
    en: (n) => `${n} passenger${n > 1 ? "s" : ""}`,
  },
  summary_class: { es: "Clase", en: "Class" },
  summary_total: { es: "Total", en: "Total" },

  // Confirmation
  confirmation_title: { es: "Reserva simulada confirmada", en: "Simulated booking confirmed" },
  confirmation_code: { es: "Código de reserva", en: "Booking code" },
  confirmation_seats: { es: "Asientos:", en: "Seats:" },
  confirmation_passengers: { es: "Pasajeros", en: "Passengers" },
  confirmation_total_paid: { es: "Total pagado (simulado)", en: "Total paid (simulated)" },
  confirmation_view_bookings: { es: "Ver mis reservas", en: "View my bookings" },
  confirmation_search_another: { es: "Buscar otro vuelo", en: "Search another flight" },
  confirmation_not_found: {
    es: "No encontramos esta reserva en este navegador.",
    en: "We couldn't find this booking in this browser.",
  },
  confirmation_not_found_hint: {
    es: "Las reservas de esta demo se guardan solo localmente y no son visibles desde otro dispositivo o navegador.",
    en: "This demo's bookings are stored locally only and aren't visible from another device or browser.",
  },

  // My bookings
  bookings_title: { es: "Mis reservas", en: "My bookings" },
  bookings_subtitle: {
    es: "Guardadas solo en este navegador — es una demo sin backend ni base de datos.",
    en: "Saved only in this browser — this is a demo with no backend or database.",
  },
  bookings_empty: { es: "Todavía no hiciste ninguna reserva.", en: "You haven't made any bookings yet." },
  bookings_roundtrip_tag: { es: "ida y vuelta", en: "round trip" },

  // Price map
  map_title: { es: "Mapa de precios", en: "Price map" },
  map_subtitle_prefix: {
    es: "Precio estimado más barato desde tu origen a cada destino, para la fecha elegida. Mapa con datos de",
    en: "Cheapest estimated price from your origin to each destination, for the chosen date. Map data from",
  },
  map_origin: { es: "Origen", en: "Origin" },
  map_date: { es: "Fecha", en: "Date" },
  map_loading: { es: "Cargando mapa…", en: "Loading map…" },
  map_price_level_cheap: { es: "Económico", en: "Cheap" },
  map_price_level_mid: { es: "Medio", en: "Average" },
  map_price_level_high: { es: "Caro", en: "Expensive" },
  map_your_origin: { es: "Tu origen", en: "Your origin" },
  map_no_data: { es: "Sin datos", en: "No data" },
  map_selected_origin: { es: "Origen seleccionado", en: "Selected origin" },
};
