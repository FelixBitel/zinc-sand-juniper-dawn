import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Smile, c as Plus, d as House, f as Footprints, h as Bone, i as Stethoscope, l as Pill, m as Check, o as Scale, p as Droplets, r as StickyNote, s as RefreshCw, t as Utensils, u as NotebookPen } from "../_libs/lucide-react.mjs";
import { l as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
import { a as format, c as differenceInCalendarDays, i as isToday, l as startOfDay, n as isYesterday, o as differenceInYears, r as subDays, s as differenceInMonths, t as ru } from "../_libs/date-fns.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { a as Area, c as Tooltip, i as XAxis, n as BarChart, o as Bar, r as YAxis, s as ResponsiveContainer, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B_-PklpW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function nid() {
	return crypto.randomUUID();
}
function clamp(n, min, max) {
	return Math.min(max, Math.max(min, n));
}
function round1(n) {
	return Math.round(n * 10) / 10;
}
function round2(n) {
	return Math.round(n * 100) / 100;
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-10 shrink-0 rounded-full px-3.5 text-sm font-medium transition-[transform,background-color,color] duration-150 active:scale-[0.96]", active ? "bg-sage text-sage-fg" : "bg-paper text-ink border border-line"),
		children
	});
}
function ChipRow({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
		children
	});
}
var ICONS = {
	walk: Footprints,
	meal: Utensils,
	water: Droplets,
	weight: Scale,
	mood: Smile,
	symptom: Stethoscope,
	play: Bone,
	note: StickyNote,
	dose: Pill,
	med: Pill
};
function EventIcon({ kind, className }) {
	const Icon = ICONS[kind] ?? StickyNote;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("flex size-10 shrink-0 items-center justify-center rounded-lg bg-sage-soft text-sage", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-4",
			strokeWidth: 2
		})
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-[transform,background-color,color,opacity] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/35", {
	variants: {
		variant: {
			primary: "bg-sage text-sage-fg",
			secondary: "bg-paper text-ink border border-line",
			ghost: "bg-transparent text-ink",
			soft: "bg-sage-soft text-sage",
			danger: "bg-clay text-sage-fg"
		},
		size: {
			sm: "h-9 px-3 text-sm rounded-md",
			md: "h-11 px-4 text-sm rounded-lg",
			lg: "h-12 px-5 rounded-lg text-base",
			icon: "size-11 rounded-lg"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Drawer$1({ open, onOpenChange, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		open,
		onOpenChange,
		shouldScaleBackground: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, { className: "fixed inset-0 z-50 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
			className: cn("fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[92dvh] w-full max-w-md flex-col rounded-t-3xl bg-bg outline-none"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-3 h-1.5 w-12 rounded-full bg-ring" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Description, {
					className: "sr-only",
					children: "Панель приложения Archie"
				}),
				children
			]
		})] })
	});
}
function DrawerHeader({ title, subtitle, onBack }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pb-3 pt-4",
		children: [
			onBack ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onBack,
				className: "mb-2 text-sm font-medium text-sage",
				children: "Назад"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
				className: "font-display text-2xl tracking-tight text-ink",
				children: title
			}),
			subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: subtitle
			}) : null
		]
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-12 w-full rounded-lg border border-line bg-paper px-3.5 text-base text-ink placeholder:text-subtle outline-none transition-shadow duration-150 focus-visible:ring-2 focus-visible:ring-sage/30", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-24 w-full rounded-lg border border-line bg-paper px-3.5 py-3 text-base text-ink placeholder:text-subtle outline-none transition-shadow duration-150 focus-visible:ring-2 focus-visible:ring-sage/30", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("mb-1.5 block text-xs font-medium text-muted", className),
		...props
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children] });
}
function plural(n, one, few, many) {
	const abs = Math.abs(Math.trunc(n)) % 100;
	const n1 = abs % 10;
	if (abs > 10 && abs < 20) return many;
	if (n1 > 1 && n1 < 5) return few;
	if (n1 === 1) return one;
	return many;
}
function ageLabel(birthday, now = /* @__PURE__ */ new Date()) {
	const b = new Date(birthday);
	const years = differenceInYears(now, b);
	const months = differenceInMonths(now, b) % 12;
	const y = `${years} ${plural(years, "год", "года", "лет")}`;
	if (months === 0) return y;
	return `${y} ${months} ${plural(months, "месяц", "месяца", "месяцев")}`;
}
function formatDay(ts) {
	const d = new Date(ts);
	if (isToday(d)) return "Сегодня";
	if (isYesterday(d)) return "Вчера";
	return format(d, "d MMMM", { locale: ru });
}
function formatDayShort(ts) {
	return format(new Date(ts), "d MMM", { locale: ru });
}
function formatTime(ts) {
	return format(new Date(ts), "HH:mm");
}
function formatDateLong(ts) {
	return format(new Date(ts), "d MMMM yyyy", { locale: ru });
}
function relativeDue(ts, now = Date.now()) {
	const days = differenceInCalendarDays(new Date(ts), new Date(now));
	if (days < 0) {
		const n = Math.abs(days);
		return `просрочено ${n} ${plural(n, "день", "дня", "дней")}`;
	}
	if (days === 0) return "сегодня";
	if (days === 1) return "завтра";
	return `через ${days} ${plural(days, "день", "дня", "дней")}`;
}
function minutesLabel(n) {
	return `${n} ${plural(n, "минута", "минуты", "минут")}`;
}
function moodLabel(mood) {
	switch (mood) {
		case "great": return "Отлично";
		case "good": return "Хорошо";
		case "ok": return "Нормально";
		case "low": return "Вялый";
		case "poor": return "Плохо";
	}
}
function slotLabel(slot) {
	switch (slot) {
		case "breakfast": return "Завтрак";
		case "dinner": return "Ужин";
		case "snack": return "Перекус";
	}
}
function eatenLabel(eaten) {
	switch (eaten) {
		case "all": return "всё";
		case "most": return "почти всё";
		case "half": return "половина";
		case "little": return "мало";
	}
}
function cadenceLabel(cadence) {
	switch (cadence) {
		case "daily": return "каждый день";
		case "monthly": return "раз в месяц";
		case "quarterly": return "раз в 3 месяца";
	}
}
function startDay(ts = Date.now()) {
	return startOfDay(new Date(ts)).getTime();
}
function kgLabel(kg) {
	return `${kg.toFixed(1).replace(".", ",")} кг`;
}
function at(daysAgo, hour, minute = 0, now = Date.now()) {
	const d = new Date(now);
	return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), hour, minute, 0, 0) - daysAgo * 864e5;
}
function jitter(seed) {
	const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
	return x - Math.floor(x);
}
var PROFILE = {
	name: "Арчи",
	breed: "Мишлинг",
	sex: "male",
	birthday: "2014-05-20",
	color: "Рыжий с белой грудкой, седина на морде",
	chip: "",
	clinic: "",
	doctor: "",
	phone: "",
	food: "Домашний рацион: курица / говядина с крупой и овощами",
	allergies: [],
	neutered: true,
	targetMinKg: 20,
	targetMaxKg: 21.5,
	walkTargetPerDay: 3,
	waterTargetMl: 1e3,
	groomingLast: 0,
	groomingEveryDays: 42,
	ownerNote: "После операции в октябре 2024. Хромота на левую заднюю лапу стала меньше. Урзахол 09:00 и 21:00, Гепатосан 09:00 и 18:00. Домашняя еда, низкий жир — печень.",
	calorieTarget: 870,
	activity: "low",
	goal: "maintenance",
	status: "Поддержка печени · восстановление после операции"
};
function buildSeed(now = Date.now()) {
	const walks = [];
	const meals = [];
	const water = [];
	const moods = [];
	const play = [];
	const weights = [];
	const doses = [];
	const moodCycle = [
		"good",
		"great",
		"good",
		"ok",
		"good",
		"great",
		"good",
		"low",
		"ok",
		"good",
		"great",
		"good",
		"good",
		"good"
	];
	for (let d = 13; d >= 0; d--) {
		const j = jitter(d + 3);
		const morningMin = 28 + Math.round(j * 8);
		const noonMin = 40 + Math.round(jitter(d + 7) * 10);
		const eveningMin = 18 + Math.round(jitter(d + 11) * 8);
		walks.push({
			id: `walk-${d}-am`,
			at: at(d, 8, 0, now),
			minutes: morningMin,
			km: round2(morningMin * .04)
		});
		if (!(d === 3 || d === 9)) walks.push({
			id: `walk-${d}-md`,
			at: at(d, 14, 0, now),
			minutes: noonMin,
			km: round2(noonMin * .04)
		});
		walks.push({
			id: `walk-${d}-pm`,
			at: at(d, 21, 0, now),
			minutes: eveningMin,
			km: round2(eveningMin * .038),
			note: d === 2 ? "Короткий вечерний круг, лапу не бережёт" : void 0,
			photo: d === 2 ? "/archie/portrait.jpg" : void 0
		});
		meals.push({
			id: `meal-${d}-b`,
			at: at(d, 9, 30, now),
			slot: "breakfast",
			food: "Курица, рис, морковь",
			grams: 300,
			eaten: d === 8 ? "most" : "all",
			ingredients: [
				"Курица 150 г",
				"Рис 100 г",
				"Морковь 50 г"
			],
			kcal: 395
		});
		meals.push({
			id: `meal-${d}-d`,
			at: at(d, 19, 0, now),
			slot: "dinner",
			food: "Говядина, гречка, тыква",
			grams: 300,
			eaten: "all",
			ingredients: [
				"Говядина 150 г",
				"Гречка 100 г",
				"Тыква 50 г"
			],
			kcal: 360
		});
		(d === 0 ? [
			180,
			200,
			240
		] : [
			200,
			180 + Math.round(j * 80),
			220,
			160
		]).forEach((ml, i) => {
			water.push({
				id: `water-${d}-${i}`,
				at: at(d, 8 + i * 4, 15, now),
				ml
			});
		});
		moods.push({
			id: `mood-${d}`,
			at: at(d, 21, 10, now),
			mood: moodCycle[13 - d] ?? "good",
			note: d === 8 ? "Немного притих после гостей" : void 0
		});
		doses.push({
			id: `dose-u-am-${d}`,
			medId: "med-urzahol",
			at: at(d, 9, 0, now)
		}, {
			id: `dose-g-${d}`,
			medId: "med-gepatosan",
			at: at(d, 18, 0, now)
		});
		if (d !== 0) doses.push({
			id: `dose-u-pm-${d}`,
			medId: "med-urzahol",
			at: at(d, 21, 0, now)
		});
		if (d === 1 || d === 5 || d === 9 || d === 12) play.push({
			id: `play-${d}`,
			at: at(d, 18, 20, now),
			minutes: 15 + Math.round(j * 10),
			kind: d === 5 ? "Мяч" : "Жевание / перетяжки"
		});
	}
	for (let w = 15; w >= 0; w--) {
		const base = 21.05 - w * .01;
		const wave = (w % 4 === 0 ? .08 : -.03) + jitter(w + 40) * .06;
		weights.push({
			id: `wt-${w}`,
			at: at(w * 7, 10, 0, now),
			kg: round1(Math.min(22.1, Math.max(20.6, base + wave)))
		});
	}
	const meds = [{
		id: "med-urzahol",
		name: "Урзахол",
		dosage: "1 капсула",
		cadence: "daily",
		nextDue: at(0, 21, 0, now),
		withFood: true,
		times: ["09:00", "21:00"],
		kind: "Противовоспалительное",
		notes: "Утром и вечером. С едой, печень."
	}, {
		id: "med-gepatosan",
		name: "Гепатосан",
		dosage: "1 таблетка",
		cadence: "daily",
		nextDue: at(0, 18, 0, now),
		withFood: true,
		times: ["09:00", "18:00"],
		kind: "Гепатопротектор",
		notes: "Утром и в 18:00."
	}];
	const vaccines = [
		{
			id: "vac-rabies",
			name: "Бешенство",
			lastAt: at(182, 11, 0, now),
			nextAt: at(-183, 11, 0, now)
		},
		{
			id: "vac-dhppi",
			name: "DHPPi",
			lastAt: at(182, 11, 30, now),
			nextAt: at(-183, 11, 30, now)
		},
		{
			id: "vac-lepto",
			name: "Лептоспироз",
			lastAt: at(350, 11, 0, now),
			nextAt: at(-15, 11, 0, now)
		}
	];
	const visits = [{
		id: "visit-next",
		at: at(-14, 11, 0, now),
		reason: "Контроль печени и хромоты",
		notes: "Биохимия, смотрим левую заднюю лапу.",
		upcoming: true
	}, {
		id: "visit-past",
		at: at(300, 11, 0, now),
		reason: "Выписка после операции",
		notes: "Октябрь 2024. Назначены Урзахол и Гепатосан.",
		upcoming: false
	}];
	const symptoms = [{
		id: "sym-1",
		at: at(3, 16, 0, now),
		name: "Хромота",
		severity: 1,
		note: "Левая задняя. После дневной прогулки чуть бережёт, к вечеру отпускает."
	}, {
		id: "sym-2",
		at: at(11, 19, 0, now),
		name: "Хромота",
		severity: 2,
		note: "Короче гуляли, без резвых игр."
	}];
	const notes = [{
		id: "note-1",
		at: at(5, 21, 40, now),
		text: "Съел ужин целиком. После Гепатосана спокоен, вечером спал на диване.",
		photo: "/archie/portrait.jpg"
	}, {
		id: "note-2",
		at: at(2, 10, 15, now),
		text: "Утро без хромоты. Урзахол с завтраком, кашу съел.",
		photo: "/archie/portrait.jpg"
	}];
	const recipes = [
		{
			id: "r-chicken",
			name: "Куриное рагу",
			ingredients: [
				"Курица 150 г",
				"Рис 100 г",
				"Морковь 50 г",
				"Кабачок 50 г"
			],
			calories: 407,
			portions: 1,
			description: "Утренняя порция, всё отварное."
		},
		{
			id: "r-beef",
			name: "Говяжий микс",
			ingredients: [
				"Говядина 150 г",
				"Гречка 100 г",
				"Тыква 50 г",
				"Яблоко 30 г"
			],
			calories: 376,
			portions: 1,
			description: "Вечер. Яблоко без семечек."
		},
		{
			id: "r-fish",
			name: "Рыбное",
			ingredients: [
				"Белая рыба 160 г",
				"Картофель 80 г",
				"Кабачок 60 г"
			],
			calories: 219,
			portions: 1,
			description: "Лёгкий день без красного мяса."
		}
	];
	return {
		profile: {
			...PROFILE,
			groomingLast: at(13, 12, 0, now)
		},
		walks,
		meals,
		water,
		weights,
		moods,
		symptoms,
		play,
		notes,
		meds,
		doses,
		vaccines,
		visits,
		recipes
	};
}
var seed = buildSeed();
function bumpDue(cadence, from) {
	const d = new Date(from);
	if (cadence === "daily") d.setDate(d.getDate() + 1);
	if (cadence === "monthly") d.setMonth(d.getMonth() + 1);
	if (cadence === "quarterly") d.setMonth(d.getMonth() + 3);
	return d.getTime();
}
var usePetStore = create()(persist((set, get) => ({
	...seed,
	hydrated: false,
	addWalk: (input) => set({ walks: [{
		id: nid(),
		at: Date.now(),
		...input
	}, ...get().walks] }),
	addMeal: (input) => set({ meals: [{
		id: nid(),
		at: Date.now(),
		...input
	}, ...get().meals] }),
	replaceTodayMeal: (input) => {
		const now = Date.now();
		const rest = get().meals.filter((m) => !(m.slot === input.slot && startDay(m.at) === startDay(now)));
		set({ meals: [{
			id: nid(),
			at: now,
			...input
		}, ...rest] });
	},
	addWater: (ml) => set({ water: [{
		id: nid(),
		at: Date.now(),
		ml
	}, ...get().water] }),
	addWeight: (kg, note) => set({ weights: [{
		id: nid(),
		at: Date.now(),
		kg,
		note
	}, ...get().weights] }),
	addMood: (input) => set({ moods: [{
		id: nid(),
		at: Date.now(),
		...input
	}, ...get().moods] }),
	addSymptom: (input) => set({ symptoms: [{
		id: nid(),
		at: Date.now(),
		...input
	}, ...get().symptoms] }),
	addPlay: (input) => set({ play: [{
		id: nid(),
		at: Date.now(),
		...input
	}, ...get().play] }),
	addNote: (input) => set({ notes: [{
		id: nid(),
		at: Date.now(),
		...input
	}, ...get().notes] }),
	logMed: (medId) => {
		if (!get().meds.find((m) => m.id === medId)) return;
		const at = Date.now();
		set({
			doses: [{
				id: nid(),
				medId,
				at
			}, ...get().doses],
			meds: get().meds.map((m) => m.id === medId ? {
				...m,
				nextDue: bumpDue(m.cadence, at)
			} : m)
		});
	},
	addRecipe: (recipe) => set({ recipes: [{
		id: nid(),
		...recipe
	}, ...get().recipes].slice(0, 12) }),
	removeEvent: (kind, id) => {
		const s = get();
		if (kind === "walk") set({ walks: s.walks.filter((x) => x.id !== id) });
		if (kind === "meal") set({ meals: s.meals.filter((x) => x.id !== id) });
		if (kind === "water") set({ water: s.water.filter((x) => x.id !== id) });
		if (kind === "weight") set({ weights: s.weights.filter((x) => x.id !== id) });
		if (kind === "mood") set({ moods: s.moods.filter((x) => x.id !== id) });
		if (kind === "symptom") set({ symptoms: s.symptoms.filter((x) => x.id !== id) });
		if (kind === "play") set({ play: s.play.filter((x) => x.id !== id) });
		if (kind === "note") set({ notes: s.notes.filter((x) => x.id !== id) });
		if (kind === "dose") set({ doses: s.doses.filter((x) => x.id !== id) });
	},
	setOwnerNote: (ownerNote) => set({ profile: {
		...get().profile,
		ownerNote
	} }),
	setCalorieTarget: (calorieTarget) => set({ profile: {
		...get().profile,
		calorieTarget
	} }),
	resetDemo: () => set({
		...buildSeed(),
		hydrated: true
	})
}), {
	name: "archie-tracker-v2",
	skipHydration: true,
	partialize: (s) => ({
		profile: s.profile,
		walks: s.walks,
		meals: s.meals,
		water: s.water,
		weights: s.weights,
		moods: s.moods,
		symptoms: s.symptoms,
		play: s.play,
		notes: s.notes,
		meds: s.meds,
		doses: s.doses,
		vaccines: s.vaccines,
		visits: s.visits,
		recipes: s.recipes
	}),
	onRehydrateStorage: () => () => {
		usePetStore.setState({ hydrated: true });
	}
}));
var TYPES = [
	{
		type: "walk",
		label: "Прогулка"
	},
	{
		type: "meal",
		label: "Еда"
	},
	{
		type: "water",
		label: "Вода"
	},
	{
		type: "weight",
		label: "Вес"
	},
	{
		type: "mood",
		label: "Настроение"
	},
	{
		type: "play",
		label: "Игра"
	},
	{
		type: "med",
		label: "Лекарство"
	},
	{
		type: "note",
		label: "Заметка"
	},
	{
		type: "symptom",
		label: "Симптом"
	}
];
var TITLES = {
	walk: "Прогулка",
	meal: "Приём пищи",
	water: "Вода",
	weight: "Вес",
	mood: "Самочувствие",
	play: "Игра",
	med: "Лекарство",
	note: "Заметка",
	symptom: "Симптом"
};
function LogSheet({ open, onOpenChange, initialType, mealSlot }) {
	const [type, setType] = (0, import_react.useState)(initialType);
	const [minutes, setMinutes] = (0, import_react.useState)(30);
	const [km, setKm] = (0, import_react.useState)(1.6);
	const [note, setNote] = (0, import_react.useState)("");
	const [slot, setSlot] = (0, import_react.useState)(mealSlot ?? "dinner");
	const [food, setFood] = (0, import_react.useState)("Курица, рис, морковь");
	const [grams, setGrams] = (0, import_react.useState)(300);
	const [eaten, setEaten] = (0, import_react.useState)("all");
	const [kcal, setKcal] = (0, import_react.useState)(395);
	const [kgValue, setKgValue] = (0, import_react.useState)("21.0");
	const [mood, setMood] = (0, import_react.useState)("good");
	const [playMin, setPlayMin] = (0, import_react.useState)(15);
	const [kind, setKind] = (0, import_react.useState)("Мяч");
	const [text, setText] = (0, import_react.useState)("");
	const [symptom, setSymptom] = (0, import_react.useState)("Мягкий стул");
	const [severity, setSeverity] = (0, import_react.useState)(1);
	const addWalk = usePetStore((s) => s.addWalk);
	const addMeal = usePetStore((s) => s.addMeal);
	const addWater = usePetStore((s) => s.addWater);
	const addWeight = usePetStore((s) => s.addWeight);
	const addMood = usePetStore((s) => s.addMood);
	const addPlay = usePetStore((s) => s.addPlay);
	const addNote = usePetStore((s) => s.addNote);
	const addSymptom = usePetStore((s) => s.addSymptom);
	const logMed = usePetStore((s) => s.logMed);
	const meds = usePetStore((s) => s.meds);
	const lastWeight = usePetStore((s) => [...s.weights].sort((a, b) => b.at - a.at)[0]?.kg);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setType(initialType);
		setMinutes(30);
		setKm(round2(1.2));
		setNote("");
		setSlot(mealSlot ?? "dinner");
		setFood(mealSlot === "dinner" ? "Говядина, гречка, тыква" : "Курица, рис, морковь");
		setGrams(300);
		setEaten("all");
		setKcal(mealSlot === "dinner" ? 360 : 395);
		setKgValue(String(lastWeight ?? 21));
		setMood("good");
		setPlayMin(15);
		setKind("Мяч");
		setText("");
		setSymptom("Мягкий стул");
		setSeverity(1);
	}, [
		open,
		initialType,
		mealSlot,
		lastWeight
	]);
	function close() {
		onOpenChange(false);
	}
	function saveWalk() {
		addWalk({
			minutes,
			km,
			note: note || void 0
		});
		toast("Прогулка записана");
		close();
	}
	function saveMeal() {
		addMeal({
			slot,
			food,
			grams,
			eaten,
			kcal,
			ingredients: food.split(",").map((s) => s.trim())
		});
		toast("Приём пищи записан");
		close();
	}
	function saveWater(ml) {
		addWater(ml);
		toast(`+${ml} мл воды`);
		close();
	}
	function saveWeight() {
		const n = Number(kgValue.replace(",", "."));
		if (!n || n < 1 || n > 40) {
			toast("Проверьте вес");
			return;
		}
		addWeight(Math.round(n * 10) / 10, note || void 0);
		toast("Вес обновлён");
		close();
	}
	function saveMood() {
		addMood({
			mood,
			note: note || void 0
		});
		toast("Самочувствие записано");
		close();
	}
	function savePlay() {
		addPlay({
			minutes: playMin,
			kind
		});
		toast("Игра записана");
		close();
	}
	function saveNote() {
		if (!text.trim()) {
			toast("Напишите пару слов");
			return;
		}
		addNote({ text: text.trim() });
		toast("Заметка сохранена");
		close();
	}
	function saveSymptom() {
		addSymptom({
			name: symptom,
			severity,
			note: note || void 0
		});
		toast("Симптом отмечен");
		close();
	}
	function saveMed(id) {
		logMed(id);
		toast("Приём отмечен");
		close();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer$1, {
		open,
		onOpenChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, {
			title: type ? TITLES[type] : "Новая запись",
			subtitle: type ? void 0 : "Что случилось с Арчи?",
			onBack: type && !initialType ? () => setType(null) : void 0
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sheet-scroll px-5 pb-8",
			children: [
				!type ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2 pb-4",
					children: TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setType(t.type),
						className: "flex flex-col items-center gap-2 rounded-xl bg-paper px-2 py-4 transition-transform duration-150 active:scale-[0.96]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventIcon, { kind: t.type }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium text-ink",
							children: t.label
						})]
					}, t.type))
				}) : null,
				type === "walk" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 pb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Длительность",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, { children: [
								20,
								30,
								45
							].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
								active: minutes === m,
								onClick: () => {
									setMinutes(m);
									setKm(round2(m * .053));
								},
								children: [m, " мин"]
							}, m)) })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Дистанция, км",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								inputMode: "decimal",
								value: String(km).replace(".", ","),
								onChange: (e) => setKm(Number(e.target.value.replace(",", ".")) || 0)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Заметка",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: note,
								onChange: (e) => setNote(e.target.value),
								placeholder: "Парк, лужи, собаки…"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							onClick: saveWalk,
							className: "w-full",
							children: "Сохранить"
						})
					]
				}) : null,
				type === "meal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 pb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Приём",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, { children: [
								"breakfast",
								"dinner",
								"snack"
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: slot === s,
								onClick: () => {
									setSlot(s);
									if (s === "breakfast") {
										setFood("Курица, рис, морковь");
										setKcal(395);
									} else if (s === "dinner") {
										setFood("Говядина, гречка, тыква");
										setKcal(360);
									}
								},
								children: slotLabel(s)
							}, s)) })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Состав",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: food,
								onChange: (e) => setFood(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Граммы",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, { children: [
								250,
								300,
								350
							].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
								active: grams === g,
								onClick: () => setGrams(g),
								children: [g, " г"]
							}, g)) })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Съел",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, { children: [
								"all",
								"most",
								"half",
								"little"
							].map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: eaten === e,
								onClick: () => setEaten(e),
								children: eatenLabel(e)
							}, e)) })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							onClick: saveMeal,
							className: "w-full",
							children: "Сохранить"
						})
					]
				}) : null,
				type === "water" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Сколько налили в миску?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [
							100,
							150,
							200,
							250
						].map((ml) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							size: "lg",
							onClick: () => saveWater(ml),
							children: [
								"+",
								ml,
								" мл"
							]
						}, ml))
					})]
				}) : null,
				type === "weight" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 pb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Килограммы",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								inputMode: "decimal",
								value: kgValue,
								onChange: (e) => setKgValue(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Заметка",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: note,
								onChange: (e) => setNote(e.target.value),
								placeholder: "Натощак, после прогулки…"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							onClick: saveWeight,
							className: "w-full",
							children: "Сохранить"
						})
					]
				}) : null,
				type === "mood" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 pb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-5 gap-1.5",
							children: [
								"great",
								"good",
								"ok",
								"low",
								"poor"
							].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMood(m),
								className: `rounded-lg px-1 py-3 text-center text-xs font-medium transition-colors duration-150 ${mood === m ? "bg-sage text-sage-fg" : "bg-paper text-ink border border-line"}`,
								children: moodLabel(m)
							}, m))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Заметка",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: note,
								onChange: (e) => setNote(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							onClick: saveMood,
							className: "w-full",
							children: "Сохранить"
						})
					]
				}) : null,
				type === "play" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 pb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Чем играли",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, { children: [
								"Мяч",
								"Перетяжки",
								"Жевание",
								"Поиск корма"
							].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: kind === k,
								onClick: () => setKind(k),
								children: k
							}, k)) })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Минуты",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, { children: [
								10,
								15,
								20,
								30
							].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: playMin === m,
								onClick: () => setPlayMin(m),
								children: m
							}, m)) })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							onClick: savePlay,
							className: "w-full",
							children: "Сохранить"
						})
					]
				}) : null,
				type === "med" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-2 pb-4",
					children: meds.map((med) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => saveMed(med.id),
						className: "flex items-center justify-between rounded-xl bg-paper px-4 py-3 text-left transition-transform duration-150 active:scale-[0.96]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium",
							children: med.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted",
							children: [med.dosage, med.times ? ` · ${med.times.join(", ")}` : ` · ${cadenceLabel(med.cadence)}`]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium text-sage",
							children: "Отметить"
						})]
					}, med.id))
				}) : null,
				type === "note" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Что заметили",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: text,
							onChange: (e) => setText(e.target.value),
							placeholder: "Сон, аппетит, настроение, странности…"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						onClick: saveNote,
						className: "w-full",
						children: "Сохранить"
					})]
				}) : null,
				type === "symptom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 pb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Симптом",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, { children: [
								"Мягкий стул",
								"Чешет ухо",
								"Вялость",
								"Хромота",
								"Кашель"
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: symptom === s,
								onClick: () => setSymptom(s),
								children: s
							}, s)) })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Сила",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, { children: [
								1,
								2,
								3
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
								active: severity === s,
								onClick: () => setSeverity(s),
								children: [s, "/3"]
							}, s)) })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Заметка",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: note,
								onChange: (e) => setNote(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							onClick: saveSymptom,
							className: "w-full",
							children: "Сохранить"
						})
					]
				}) : null
			]
		})]
	});
}
function isSameDay(a, b) {
	return startDay(a) === startDay(b);
}
function inLastDays(ts, days, now = Date.now()) {
	return ts >= startDay(now) - (days - 1) * 864e5 && ts <= now + 6e4;
}
function todayWalks(data, now = Date.now()) {
	return data.walks.filter((w) => isSameDay(w.at, now));
}
function todayMeals(data, now = Date.now()) {
	return data.meals.filter((m) => isSameDay(m.at, now));
}
function todayWaterMl(data, now = Date.now()) {
	return data.water.filter((w) => isSameDay(w.at, now)).reduce((s, w) => s + w.ml, 0);
}
function todayKcal(data, now = Date.now()) {
	return todayMeals(data, now).reduce((s, m) => s + (m.kcal ?? 0), 0);
}
function latestWeight(data) {
	return [...data.weights].sort((a, b) => b.at - a.at)[0];
}
function walkMinutesBetween(data, from, to) {
	return data.walks.filter((w) => w.at >= from && w.at <= to).reduce((s, w) => s + w.minutes, 0);
}
function computeWellness(data, now = Date.now()) {
	const walkScore = clamp(data.walks.filter((w) => inLastDays(w.at, 7, now)).length / (data.profile.walkTargetPerDay * 7), 0, 1) * 30;
	const waterScore = clamp(todayWaterMl(data, now) / data.profile.waterTargetMl, 0, 1) * 15;
	const meals = todayMeals(data, now);
	const mealScore = ((meals.some((m) => m.slot === "breakfast") ? 1 : 0) + (meals.some((m) => m.slot === "dinner") ? 1 : 0)) * 7.5;
	const weight = latestWeight(data);
	const weightScore = weight && weight.kg >= data.profile.targetMinKg && weight.kg <= data.profile.targetMaxKg ? 15 : weight ? 8 : 4;
	const recentMoods = data.moods.filter((m) => inLastDays(m.at, 5, now));
	const moodMap = {
		great: 1,
		good: .82,
		ok: .62,
		low: .38,
		poor: .15
	};
	const moodScore = (recentMoods.length === 0 ? .7 : recentMoods.reduce((s, m) => s + moodMap[m.mood], 0) / recentMoods.length) * 15;
	const overdue = data.meds.filter((m) => m.nextDue < now - 432e5);
	const medScore = overdue.length === 0 ? 10 : Math.max(3, 10 - overdue.length * 4);
	return clamp(Math.round(walkScore + waterScore + mealScore + weightScore + moodScore + medScore), 12, 99);
}
function wellnessCaption(score) {
	if (score >= 85) return "Стабилен";
	if (score >= 70) return "Хорошо";
	if (score >= 55) return "Внимание";
	return "Нужен уход";
}
function computeInsights(data, now = Date.now()) {
	const out = [];
	const water = todayWaterMl(data, now);
	if (water < data.profile.waterTargetMl * .75) out.push({
		id: "water",
		tone: "warn",
		text: `Воды сегодня ${water} мл из ${data.profile.waterTargetMl}. Имеет смысл долить миску перед сном.`
	});
	else out.push({
		id: "water",
		tone: "good",
		text: `Питьевой режим в порядке: ${water} мл за сегодня.`
	});
	const walks = todayWalks(data, now);
	if (walks.length < data.profile.walkTargetPerDay) out.push({
		id: "walk",
		tone: "ok",
		text: `Прогулок сегодня ${walks.length} из ${data.profile.walkTargetPerDay}. Вечерний круг ещё можно успеть.`
	});
	const weekAgoTo = startDay(now);
	const thisWeek = walkMinutesBetween(data, subDays(weekAgoTo, 6).getTime(), now);
	const lastWeek = walkMinutesBetween(data, subDays(weekAgoTo, 13).getTime(), subDays(weekAgoTo, 7).getTime() + 864e5 - 1);
	if (lastWeek > 0) {
		const diff = thisWeek - lastWeek;
		if (diff <= -40) out.push({
			id: "trend",
			tone: "warn",
			text: `За неделю прогулок на ${minutesLabel(Math.abs(diff))} меньше, чем на прошлой.`
		});
		else if (diff >= 30) out.push({
			id: "trend",
			tone: "good",
			text: `Активность выше прошлой недели на ${minutesLabel(diff)}.`
		});
	}
	const weight = latestWeight(data);
	if (weight) {
		if (weight.kg >= data.profile.targetMinKg && weight.kg <= data.profile.targetMaxKg) out.push({
			id: "weight",
			tone: "good",
			text: `Вес ${kgLabel(weight.kg)} — в целевом диапазоне для Арчи.`
		});
		else out.push({
			id: "weight",
			tone: "warn",
			text: `Вес ${kgLabel(weight.kg)} вне целевого диапазона ${data.profile.targetMinKg}–${data.profile.targetMaxKg} кг.`
		});
	}
	const kcal = todayKcal(data, now);
	const target = data.profile.calorieTarget;
	if (kcal > 0 && kcal < target * .85) out.push({
		id: "kcal",
		tone: "ok",
		text: `Домашние порции дают ${kcal} ккал из ${target}. В «Питании» можно подогнать к норме.`
	});
	else if (kcal > 0) out.push({
		id: "kcal",
		tone: "good",
		text: `Рацион ${kcal} из ${target} ккал.`
	});
	const dueSoon = data.meds.filter((m) => differenceInCalendarDays(new Date(m.nextDue), new Date(now)) <= 7).sort((a, b) => a.nextDue - b.nextDue)[0];
	if (dueSoon) out.push({
		id: "med",
		tone: differenceInCalendarDays(new Date(dueSoon.nextDue), new Date(now)) <= 0 ? "warn" : "ok",
		text: `${dueSoon.name}: ${relativeDue(dueSoon.nextDue, now)}.`
	});
	return out.slice(0, 3);
}
function todaySchedule(data, now = Date.now()) {
	const walks = todayWalks(data, now);
	const meals = todayMeals(data, now);
	const morningWalk = walks.some((w) => new Date(w.at).getHours() < 12);
	const noonWalk = walks.some((w) => {
		const h = new Date(w.at).getHours();
		return h >= 12 && h < 18;
	});
	const eveningWalk = walks.some((w) => new Date(w.at).getHours() >= 18);
	const urzahol = data.meds.find((m) => m.id === "med-urzahol");
	const gepa = data.meds.find((m) => m.id === "med-gepatosan");
	const urzaholToday = data.doses.filter((d) => d.medId === urzahol?.id && isSameDay(d.at, now));
	const gepaToday = data.doses.filter((d) => d.medId === gepa?.id && isSameDay(d.at, now));
	const urzaholAm = urzaholToday.some((d) => new Date(d.at).getHours() < 15);
	const urzaholPm = urzaholToday.some((d) => new Date(d.at).getHours() >= 15);
	const gepaDone = gepaToday.length > 0;
	return [
		{
			id: "walk-am",
			title: "Утренняя прогулка",
			time: "08:00",
			done: morningWalk,
			log: "walk"
		},
		{
			id: "urzahol-am",
			title: "Урзахол",
			time: "09:00",
			done: urzaholAm,
			log: "med",
			medId: urzahol?.id
		},
		{
			id: "breakfast",
			title: "Завтрак",
			time: "09:30",
			done: meals.some((m) => m.slot === "breakfast"),
			log: "meal",
			slot: "breakfast"
		},
		{
			id: "walk-md",
			title: "Дневная прогулка",
			time: "14:00",
			done: noonWalk,
			log: "walk"
		},
		{
			id: "gepa",
			title: "Гепатосан",
			time: "18:00",
			done: gepaDone,
			log: "med",
			medId: gepa?.id
		},
		{
			id: "dinner",
			title: "Ужин",
			time: "19:00",
			done: meals.some((m) => m.slot === "dinner"),
			log: "meal",
			slot: "dinner"
		},
		{
			id: "walk-pm",
			title: "Вечерний круг",
			time: "21:00",
			done: eveningWalk,
			log: "walk"
		},
		{
			id: "urzahol-pm",
			title: "Урзахол",
			time: "21:00",
			done: urzaholPm,
			log: "med",
			medId: urzahol?.id
		}
	];
}
var FILTER_KINDS = {
	all: null,
	activity: ["walk", "play"],
	food: ["meal", "water"],
	health: [
		"weight",
		"mood",
		"symptom",
		"note"
	],
	care: ["dose"]
};
function collectEvents(data, filter = "all") {
	const items = [
		...data.walks.map((data) => ({
			kind: "walk",
			data
		})),
		...data.meals.map((data) => ({
			kind: "meal",
			data
		})),
		...data.water.map((data) => ({
			kind: "water",
			data
		})),
		...data.weights.map((data) => ({
			kind: "weight",
			data
		})),
		...data.moods.map((data) => ({
			kind: "mood",
			data
		})),
		...data.symptoms.map((data) => ({
			kind: "symptom",
			data
		})),
		...data.play.map((data) => ({
			kind: "play",
			data
		})),
		...data.notes.map((data) => ({
			kind: "note",
			data
		})),
		...data.doses.map((data) => ({
			kind: "dose",
			data
		}))
	];
	const kinds = FILTER_KINDS[filter];
	return (kinds ? items.filter((i) => kinds.includes(i.kind)) : items).sort((a, b) => b.data.at - a.data.at);
}
function eventTitle(item, data) {
	switch (item.kind) {
		case "walk": return "Прогулка";
		case "meal": return slotLabel(item.data.slot);
		case "water": return "Вода";
		case "weight": return "Вес";
		case "mood": return moodLabel(item.data.mood);
		case "symptom": return item.data.name;
		case "play": return item.data.kind;
		case "note": return "Заметка";
		case "dose": {
			const med = data.meds.find((m) => m.id === item.data.medId);
			return med ? med.name : "Лекарство";
		}
	}
}
function eventSubtitle(item) {
	switch (item.kind) {
		case "walk": return `${minutesLabel(item.data.minutes)} · ${item.data.km.toFixed(1).replace(".", ",")} км`;
		case "meal": {
			const kcal = item.data.kcal ? ` · ${item.data.kcal} ккал` : "";
			return `${item.data.food} · ${item.data.grams} г${kcal}`;
		}
		case "water": return `${item.data.ml} мл`;
		case "weight": return kgLabel(item.data.kg);
		case "mood": return item.data.note ?? "Самочувствие";
		case "symptom": return item.data.note ?? `Сила ${item.data.severity}/3`;
		case "play": return minutesLabel(item.data.minutes);
		case "note": return item.data.text;
		case "dose": return "Принято";
	}
}
function groupByDay(items) {
	const groups = [];
	for (const item of items) {
		const key = startDay(item.data.at);
		const last = groups[groups.length - 1];
		if (last && startDay(last.at) === key) last.items.push(item);
		else groups.push({
			day: formatDay(item.data.at),
			at: item.data.at,
			items: [item]
		});
	}
	return groups;
}
function weekDays(now = Date.now()) {
	const start = startDay(now);
	const monday = start - (new Date(start).getDay() + 6) % 7 * 864e5;
	return Array.from({ length: 7 }, (_, i) => monday + i * 864e5);
}
function ChartTip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-line bg-paper px-2.5 py-1.5 text-xs text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "tabular font-medium",
			children: payload[0]?.value
		})]
	});
}
function WeightChart({ data }) {
	const points = [...data.weights].sort((a, b) => a.at - b.at).slice(-12).map((w) => ({
		label: formatDayShort(w.at),
		kg: w.kg
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-44 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data: points,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tick: {
							fill: "var(--color-subtle)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						domain: ["dataMin - 0.3", "dataMax + 0.3"],
						width: 36,
						tick: {
							fill: "var(--color-subtle)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTip, {}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "kg",
						stroke: "var(--color-sage)",
						fill: "var(--color-sage-soft)",
						strokeWidth: 2
					})
				]
			})
		})
	});
}
function WalkWeekChart({ data }) {
	const points = weekDays().map((d) => ({
		label: formatDayShort(d).replace(".", ""),
		min: walkMinutesBetween(data, d, d + 864e5 - 1),
		today: startDay() === d
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-40 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data: points,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tick: {
							fill: "var(--color-subtle)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { hide: true }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTip, {}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "min",
						fill: "var(--color-sage)",
						radius: [
							6,
							6,
							6,
							6
						]
					})
				]
			})
		})
	});
}
function eventPhoto(item) {
	if (item.kind === "walk") return item.data.photo;
	if (item.kind === "note") return item.data.photo;
}
function EventRow({ item, data, onClick }) {
	const photo = eventPhoto(item);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex w-full items-start gap-3 rounded-xl p-1 text-left transition-transform duration-150 active:scale-[0.96]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventIcon, { kind: item.kind }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm font-medium text-ink",
						children: eventTitle(item, data)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular shrink-0 text-xs text-subtle",
						children: formatTime(item.data.at)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 line-clamp-2 text-sm text-muted",
					children: eventSubtitle(item)
				})]
			}),
			photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: photo,
				alt: "",
				className: "size-12 shrink-0 rounded-md object-cover"
			}) : null
		]
	});
}
function Section({ title, action, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl tracking-tight text-ink",
				children: title
			}), action]
		}), children]
	});
}
function Paper({ className, children, onClick }) {
	const cls = cn("rounded-2xl bg-paper p-4", className);
	if (onClick) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn(cls, "w-full text-left transition-transform duration-150 active:scale-[0.96]"),
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cls,
		children
	});
}
var FILTERS = [
	{
		id: "all",
		label: "Все"
	},
	{
		id: "activity",
		label: "Активность"
	},
	{
		id: "food",
		label: "Еда"
	},
	{
		id: "health",
		label: "Здоровье"
	},
	{
		id: "care",
		label: "Лекарства"
	}
];
function JournalScreen({ onLog }) {
	const data = usePetStore();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const events = (0, import_react.useMemo)(() => collectEvents(data, filter), [data, filter]);
	const groups = (0, import_react.useMemo)(() => groupByDay(events), [events]);
	const removeEvent = usePetStore((s) => s.removeEvent);
	const photo = selected?.kind === "walk" ? selected.data.photo : selected?.kind === "note" ? selected.data.photo : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "px-4 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "История"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl tracking-tight",
					children: "Журнал"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, { children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: filter === f.id,
					onClick: () => setFilter(f.id),
					children: f.label
				}, f.id)) })
			}),
			filter === "all" || filter === "activity" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Прогулки за неделю",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalkWeekChart, { data }) })
			}) : null,
			groups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
					className: "py-10 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl",
							children: "Пока пусто"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Добавьте первую запись об Арчи."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-4",
							onClick: onLog,
							children: "Новая запись"
						})
					]
				})
			}) : groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: group.day,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					className: "flex flex-col gap-1 p-2",
					children: group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventRow, {
						item,
						data,
						onClick: () => setSelected(item)
					}, `${item.kind}-${item.data.id}`))
				})
			}, group.at)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
				open: !!selected,
				onOpenChange: (o) => !o && setSelected(null),
				children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, {
					title: eventTitle(selected, data),
					subtitle: `${formatDateLong(selected.data.at)} · ${formatTime(selected.data.at)}`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sheet-scroll px-5 pb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-ink",
							children: eventSubtitle(selected)
						}),
						photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: photo,
							alt: "",
							className: "mt-4 w-full rounded-xl object-cover"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "danger",
							className: "mt-6 w-full",
							onClick: () => {
								removeEvent(selected.kind, selected.data.id);
								setSelected(null);
							},
							children: "Удалить запись"
						})
					]
				})] }) : null
			})
		]
	});
}
function Badge({ className, tone = "default", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", tone === "default" && "bg-sage-soft text-sage", tone === "good" && "bg-sage-soft text-sage", tone === "warn" && "bg-honey/15 text-honey", tone === "muted" && "bg-surface text-muted", className),
		children
	});
}
var INGREDIENTS = [
	{
		id: "chicken_breast",
		name: "Курица (грудка)",
		calsPer100g: 165,
		protein: 31,
		fat: 3.6,
		carbs: 0,
		fiber: 0,
		category: "protein",
		liverFriendly: true
	},
	{
		id: "turkey_breast",
		name: "Индейка (грудка)",
		calsPer100g: 135,
		protein: 29,
		fat: 1,
		carbs: 0,
		fiber: 0,
		category: "protein",
		liverFriendly: true
	},
	{
		id: "beef_lean",
		name: "Говядина постная",
		calsPer100g: 158,
		protein: 26,
		fat: 6,
		carbs: 0,
		fiber: 0,
		category: "protein",
		liverFriendly: true,
		note: "Умеренный жир — в дневном ужине Арчи"
	},
	{
		id: "beef_heart",
		name: "Говяжье сердце",
		calsPer100g: 112,
		protein: 17,
		fat: 4.5,
		carbs: .1,
		fiber: 0,
		category: "protein",
		liverFriendly: true
	},
	{
		id: "chicken_heart",
		name: "Куриное сердце",
		calsPer100g: 153,
		protein: 16,
		fat: 9,
		carbs: .9,
		fiber: 0,
		category: "protein",
		liverFriendly: true
	},
	{
		id: "chicken_gizzard",
		name: "Куриные желудки",
		calsPer100g: 94,
		protein: 18,
		fat: 2.1,
		carbs: 0,
		fiber: 0,
		category: "protein",
		liverFriendly: true
	},
	{
		id: "chicken_liver",
		name: "Печень куриная",
		calsPer100g: 119,
		protein: 17,
		fat: 4.5,
		carbs: 2.9,
		fiber: 0,
		category: "protein",
		liverFriendly: false,
		maxPerWeek: 2,
		note: "Не с Урзахолом и Гепатосаном"
	},
	{
		id: "fish_white",
		name: "Рыба белая",
		calsPer100g: 90,
		protein: 20,
		fat: 1,
		carbs: 0,
		fiber: 0,
		category: "protein",
		liverFriendly: true
	},
	{
		id: "salmon",
		name: "Лосось",
		calsPer100g: 208,
		protein: 20,
		fat: 13,
		carbs: 0,
		fiber: 0,
		category: "protein",
		liverFriendly: true,
		note: "Жирноват — небольшая порция"
	},
	{
		id: "beef_tripe",
		name: "Говяжий рубец",
		calsPer100g: 96,
		protein: 14,
		fat: 4,
		carbs: 0,
		fiber: 0,
		category: "protein",
		liverFriendly: true
	},
	{
		id: "cottage_cheese",
		name: "Творог 5%",
		calsPer100g: 121,
		protein: 17,
		fat: 5,
		carbs: 3.3,
		fiber: 0,
		category: "dairy",
		liverFriendly: true
	},
	{
		id: "egg",
		name: "Яйцо",
		calsPer100g: 155,
		protein: 13,
		fat: 11,
		carbs: 1.1,
		fiber: 0,
		category: "dairy",
		liverFriendly: true
	},
	{
		id: "rice",
		name: "Рис",
		calsPer100g: 130,
		protein: 2.7,
		fat: .3,
		carbs: 28,
		fiber: .4,
		category: "grain",
		liverFriendly: true
	},
	{
		id: "buckwheat",
		name: "Гречка",
		calsPer100g: 110,
		protein: 3.4,
		fat: .6,
		carbs: 22,
		fiber: 1.5,
		category: "grain",
		liverFriendly: true
	},
	{
		id: "oatmeal",
		name: "Овсянка",
		calsPer100g: 68,
		protein: 2.5,
		fat: 1.4,
		carbs: 12,
		fiber: 2,
		category: "grain",
		liverFriendly: true
	},
	{
		id: "potato",
		name: "Картофель",
		calsPer100g: 76,
		protein: 2,
		fat: .1,
		carbs: 17,
		fiber: 1.4,
		category: "grain",
		liverFriendly: true
	},
	{
		id: "carrot",
		name: "Морковь",
		calsPer100g: 35,
		protein: .9,
		fat: .2,
		carbs: 7,
		fiber: 2.4,
		category: "veggie",
		liverFriendly: true
	},
	{
		id: "pumpkin",
		name: "Тыква",
		calsPer100g: 26,
		protein: 1,
		fat: .1,
		carbs: 5,
		fiber: .5,
		category: "veggie",
		liverFriendly: true
	},
	{
		id: "zucchini",
		name: "Кабачок",
		calsPer100g: 24,
		protein: 1.2,
		fat: .3,
		carbs: 3.5,
		fiber: 1.1,
		category: "veggie",
		liverFriendly: true
	},
	{
		id: "broccoli",
		name: "Брокколи",
		calsPer100g: 34,
		protein: 2.8,
		fat: .4,
		carbs: 5,
		fiber: 2.6,
		category: "veggie",
		liverFriendly: true,
		maxPerWeek: 3
	},
	{
		id: "greenery",
		name: "Зелень",
		calsPer100g: 25,
		protein: 2.5,
		fat: .5,
		carbs: 2,
		fiber: 1.8,
		category: "veggie",
		liverFriendly: true
	},
	{
		id: "cucumber",
		name: "Огурец",
		calsPer100g: 15,
		protein: .7,
		fat: .1,
		carbs: 2.8,
		fiber: .5,
		category: "veggie",
		liverFriendly: true
	},
	{
		id: "apple",
		name: "Яблоко",
		calsPer100g: 52,
		protein: .3,
		fat: .2,
		carbs: 12,
		fiber: 2.4,
		category: "fruit",
		liverFriendly: true,
		seedsRemove: true
	},
	{
		id: "pear",
		name: "Груша",
		calsPer100g: 57,
		protein: .4,
		fat: .1,
		carbs: 13,
		fiber: 3.1,
		category: "fruit",
		liverFriendly: true,
		seedsRemove: true
	},
	{
		id: "blueberry",
		name: "Черника",
		calsPer100g: 57,
		protein: .7,
		fat: .3,
		carbs: 14,
		fiber: 2.4,
		category: "fruit",
		liverFriendly: true
	},
	{
		id: "olive_oil",
		name: "Оливковое масло",
		calsPer100g: 884,
		protein: 0,
		fat: 100,
		carbs: 0,
		fiber: 0,
		category: "oil",
		liverFriendly: true,
		maxPerMeal: 5
	},
	{
		id: "salmon_oil",
		name: "Рыбий жир",
		calsPer100g: 900,
		protein: 0,
		fat: 100,
		carbs: 0,
		fiber: 0,
		category: "oil",
		liverFriendly: true,
		maxPerMeal: 3
	}
];
var BY_ID = new Map(INGREDIENTS.map((i) => [i.id, i]));
function getIngredient(id) {
	return BY_ID.get(id);
}
var LIVER_MEDS = [
	"урзахол",
	"гептрал",
	"эссенциале",
	"карсил",
	"гепатосан"
];
function hasLiverMeds(meds) {
	return meds.some((m) => LIVER_MEDS.some((k) => m.toLowerCase().includes(k)));
}
function isSafeIngredient(ing, profile) {
	if (profile.allergies.some((a) => ing.name.toLowerCase().includes(a.toLowerCase()))) return false;
	if (hasLiverMeds(profile.medications) && !ing.liverFriendly) return false;
	if (profile.ageYears >= 10 && (ing.category === "protein" || ing.category === "dairy") && ing.fat > 15) return false;
	return true;
}
function safeIngredients(profile, category) {
	return INGREDIENTS.filter((i) => {
		if (!isSafeIngredient(i, profile)) return false;
		if (!category) return true;
		if (i.category === category) return true;
		if (category === "protein" && i.category === "dairy") return true;
		return false;
	});
}
function dietWarnings(profile) {
	const out = [];
	if (hasLiverMeds(profile.medications)) out.push("Урзахол и Гепатосан — держим жир низким, без печени и жирных субпродуктов.");
	if (profile.ageYears >= 10) out.push("Пожилой: варка, спокойная смена белка, омега-3 каплей рыбьего жира.");
	return out;
}
var ACTIVITY = {
	low: 1.2,
	medium: 1.4,
	high: 1.6
};
var GOAL = {
	maintenance: 1,
	loss: .8,
	gain: 1.2,
	recovery: 1.1
};
function ageMult(years) {
	if (years < 1) return 3;
	if (years < 7) return 1;
	if (years < 10) return .9;
	return .8;
}
function calcRER(weightKg) {
	return Math.round(70 * Math.pow(weightKg, .75));
}
function calcFormulaCalories(profile) {
	return Math.round(calcRER(profile.weightKg) * ACTIVITY[profile.activity] * GOAL[profile.goal] * ageMult(profile.ageYears));
}
function splitMeals(total) {
	return {
		breakfast: Math.round(total * .45),
		dinner: Math.round(total * .55)
	};
}
function portionKcal(id, grams) {
	const ing = getIngredient(id);
	if (!ing) return 0;
	return ing.calsPer100g * grams / 100;
}
function resolvePortions(portions) {
	return portions.map((p) => {
		const ingredient = getIngredient(p.id);
		if (!ingredient) return null;
		const grams = p.grams;
		return {
			ingredient,
			grams,
			kcal: round1(portionKcal(p.id, grams))
		};
	}).filter((x) => Boolean(x));
}
function totals(portions) {
	const acc = resolvePortions(portions).reduce((s, p) => {
		const k = p.grams / 100;
		return {
			kcal: s.kcal + p.ingredient.calsPer100g * k,
			protein: s.protein + p.ingredient.protein * k,
			fat: s.fat + p.ingredient.fat * k,
			carbs: s.carbs + p.ingredient.carbs * k,
			grams: s.grams + p.grams
		};
	}, {
		kcal: 0,
		protein: 0,
		fat: 0,
		carbs: 0,
		grams: 0
	});
	return {
		kcal: Math.round(acc.kcal),
		protein: round1(acc.protein),
		fat: round1(acc.fat),
		carbs: round1(acc.carbs),
		grams: Math.round(acc.grams)
	};
}
function formatPortions(portions) {
	return resolvePortions(portions).map((p) => `${p.ingredient.name} ${p.grams} г`);
}
function mealTitle(portions) {
	return resolvePortions(portions).filter((p) => p.ingredient.category !== "oil").map((p) => p.ingredient.name.replace(/\s*\(.*\)/, "")).slice(0, 3).join(", ");
}
function clampOil(p) {
	const ing = getIngredient(p.id);
	if (!ing?.maxPerMeal) return p;
	return {
		...p,
		grams: Math.min(p.grams, ing.maxPerMeal)
	};
}
function scalePortions(portions, targetKcal) {
	const food = portions.filter((p) => getIngredient(p.id)?.category !== "oil").map(clampOil);
	const oils = portions.filter((p) => getIngredient(p.id)?.category === "oil").map(clampOil);
	const oilKcal = totals(oils).kcal;
	const factor = Math.max(40, targetKcal - oilKcal) / (totals(food).kcal || 1);
	return [...food.map((p) => ({
		id: p.id,
		grams: Math.max(10, Math.round(p.grams * factor))
	})), ...oils];
}
function pick(arr, n) {
	if (arr.length === 0) return void 0;
	return arr[(n % arr.length + arr.length) % arr.length];
}
var USUAL_BREAKFAST = [
	{
		id: "chicken_breast",
		grams: 150
	},
	{
		id: "rice",
		grams: 100
	},
	{
		id: "carrot",
		grams: 50
	}
];
var USUAL_DINNER = [
	{
		id: "beef_lean",
		grams: 150
	},
	{
		id: "buckwheat",
		grams: 100
	},
	{
		id: "pumpkin",
		grams: 50
	}
];
function cookingMethod(profile) {
	return profile.ageYears >= 10 ? "варка" : "варка или пар";
}
function usualDay(targetKcal, profile) {
	const split = splitMeals(targetKcal);
	return {
		breakfast: {
			slot: "breakfast",
			targetKcal: split.breakfast,
			portions: USUAL_BREAKFAST.map((p) => ({ ...p })),
			method: cookingMethod(profile)
		},
		dinner: {
			slot: "dinner",
			targetKcal: split.dinner,
			portions: USUAL_DINNER.map((p) => ({ ...p })),
			method: cookingMethod(profile)
		}
	};
}
function variantDay(profile, targetKcal, nonce) {
	const proteins = safeIngredients(profile, "protein").filter((p) => p.fat <= 10);
	const grains = safeIngredients(profile, "grain");
	const veggies = safeIngredients(profile, "veggie");
	const split = splitMeals(targetKcal);
	function build(slot, n, oilId, oilG) {
		const protein = pick(proteins, n)?.id ?? "chicken_breast";
		const grain = pick(grains, n + 3)?.id ?? "rice";
		let veg = pick(veggies, n + 7)?.id ?? "carrot";
		if (veg === protein) veg = pick(veggies, n + 11)?.id ?? veg;
		const draft = [
			{
				id: protein,
				grams: 150
			},
			{
				id: grain,
				grams: 100
			},
			{
				id: veg,
				grams: 50
			},
			{
				id: oilId,
				grams: oilG
			}
		];
		return {
			slot,
			targetKcal: slot === "breakfast" ? split.breakfast : split.dinner,
			portions: scalePortions(draft, slot === "breakfast" ? split.breakfast : split.dinner),
			method: cookingMethod(profile)
		};
	}
	return {
		breakfast: build("breakfast", nonce, "olive_oil", 3),
		dinner: build("dinner", nonce + 17, "salmon_oil", 2)
	};
}
function swapPortion(portions, index, nextId) {
	const current = portions[index];
	if (!current) return portions;
	const oldKcal = portionKcal(current.id, current.grams) || 1;
	const next = getIngredient(nextId);
	if (!next) return portions;
	let grams = Math.round(oldKcal / next.calsPer100g * 100);
	if (next.maxPerMeal) grams = Math.min(grams, next.maxPerMeal);
	grams = Math.max(next.category === "oil" ? 1 : 10, grams);
	return portions.map((p, i) => i === index ? {
		id: nextId,
		grams
	} : p);
}
function setPortionGrams(portions, index, grams) {
	const current = portions[index];
	if (!current) return portions;
	const ing = getIngredient(current.id);
	let g = Math.max(1, Math.round(grams));
	if (ing?.maxPerMeal) g = Math.min(g, ing.maxPerMeal);
	return portions.map((p, i) => i === index ? {
		...p,
		grams: g
	} : p);
}
var RECIPE_LIBRARY = [
	{
		id: "r-chicken",
		name: "Куриное рагу",
		portions: [
			{
				id: "chicken_breast",
				grams: 150
			},
			{
				id: "rice",
				grams: 100
			},
			{
				id: "carrot",
				grams: 50
			},
			{
				id: "zucchini",
				grams: 50
			}
		],
		description: "Привычный завтрак, кабачок вместо части моркови."
	},
	{
		id: "r-beef",
		name: "Говяжий микс",
		portions: [
			{
				id: "beef_lean",
				grams: 150
			},
			{
				id: "buckwheat",
				grams: 100
			},
			{
				id: "pumpkin",
				grams: 50
			},
			{
				id: "apple",
				grams: 30
			}
		],
		description: "Вечерняя порция. Яблоко — без семечек."
	},
	{
		id: "r-fish",
		name: "Рыбное",
		portions: [
			{
				id: "fish_white",
				grams: 160
			},
			{
				id: "potato",
				grams: 80
			},
			{
				id: "zucchini",
				grams: 60
			},
			{
				id: "salmon_oil",
				grams: 2
			}
		],
		description: "Лёгкий белок, если нужен перерыв от мяса."
	}
];
function dietFromStore() {
	const s = usePetStore.getState();
	return {
		weightKg: latestWeight(s)?.kg ?? 21,
		ageYears: differenceInYears(/* @__PURE__ */ new Date(), new Date(s.profile.birthday)),
		activity: s.profile.activity,
		goal: s.profile.goal,
		allergies: s.profile.allergies,
		medications: s.meds.map((m) => m.name),
		calorieTarget: s.profile.calorieTarget
	};
}
function mealToLog(meal) {
	const t = totals(meal.portions);
	return {
		slot: meal.slot,
		food: mealTitle(meal.portions),
		grams: t.grams,
		eaten: "all",
		ingredients: formatPortions(meal.portions),
		kcal: t.kcal
	};
}
function MacroBar({ protein, fat, carbs }) {
	const p = protein * 4;
	const f = fat * 9;
	const c = carbs * 4;
	const sum = p + f + c || 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-1.5 overflow-hidden rounded-full bg-line",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bg-sage",
				style: { width: `${p / sum * 100}%` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bg-honey",
				style: { width: `${f / sum * 100}%` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bg-ring",
				style: { width: `${c / sum * 100}%` }
			})
		]
	});
}
function MealCard({ meal, onSwap, onGrams }) {
	const t = totals(meal.portions);
	const rows = resolvePortions(meal.portions);
	const delta = t.kcal - meal.targetKcal;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl tracking-tight",
				children: slotLabel(meal.slot)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tabular text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: t.kcal
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-subtle",
					children: [
						" / ",
						meal.targetKcal,
						" ккал"
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-xs text-muted",
			children: [meal.method, delta > 25 ? ` · выше нормы на ${delta}` : delta < -25 ? ` · ниже на ${Math.abs(delta)}` : " · в норме"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-col gap-1",
			children: rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 rounded-lg px-1 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onSwap(i),
					className: "min-w-0 flex-1 text-left transition-transform duration-150 active:scale-[0.98]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate text-sm font-medium",
						children: row.ingredient.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-subtle",
						children: [row.kcal, " ккал · заменить"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onGrams(i, row.grams - 10),
							className: "flex size-8 items-center justify-center rounded-md border border-line text-sm",
							"aria-label": "Меньше",
							children: "−"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular w-10 text-center text-sm",
							children: [row.grams, "г"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onGrams(i, row.grams + 10),
							className: "flex size-8 items-center justify-center rounded-md border border-line text-sm",
							"aria-label": "Больше",
							children: "+"
						})
					]
				})]
			}, `${row.ingredient.id}-${i}`))
		})
	] });
}
function NutritionScreen() {
	const profile = usePetStore((s) => s.profile);
	const recipes = usePetStore((s) => s.recipes);
	const replaceTodayMeal = usePetStore((s) => s.replaceTodayMeal);
	const addRecipe = usePetStore((s) => s.addRecipe);
	const setCalorieTarget = usePetStore((s) => s.setCalorieTarget);
	const logged = todayKcal(usePetStore());
	const diet = dietFromStore();
	const formula = calcFormulaCalories(diet);
	const target = profile.calorieTarget;
	const split = splitMeals(target);
	const [nonce, setNonce] = (0, import_react.useState)(0);
	const [mode, setMode] = (0, import_react.useState)("usual");
	const initial = (0, import_react.useMemo)(() => usualDay(target, diet), [target, diet.ageYears]);
	const [breakfast, setBreakfast] = (0, import_react.useState)(initial.breakfast);
	const [dinner, setDinner] = (0, import_react.useState)(initial.dinner);
	(0, import_react.useEffect)(() => {
		const s = splitMeals(target);
		setBreakfast((m) => ({
			...m,
			targetKcal: s.breakfast
		}));
		setDinner((m) => ({
			...m,
			targetKcal: s.dinner
		}));
	}, [target]);
	const [swap, setSwap] = (0, import_react.useState)(null);
	const day = totals([...breakfast.portions, ...dinner.portions]);
	const warnings = dietWarnings(diet);
	const fatPct = day.kcal ? Math.round(day.fat * 9 / day.kcal * 100) : 0;
	function applyDay(next) {
		setBreakfast({
			...next.breakfast,
			targetKcal: split.breakfast
		});
		setDinner({
			...next.dinner,
			targetKcal: split.dinner
		});
	}
	function loadUsual() {
		setMode("usual");
		applyDay(usualDay(target, diet));
	}
	function loadVariant() {
		const n = nonce + 1;
		setNonce(n);
		setMode("variant");
		applyDay(variantDay(diet, target, n));
	}
	function fitTarget() {
		setBreakfast((m) => ({
			...m,
			portions: scalePortions(m.portions, split.breakfast),
			targetKcal: split.breakfast
		}));
		setDinner((m) => ({
			...m,
			portions: scalePortions(m.portions, split.dinner),
			targetKcal: split.dinner
		}));
		toast("Порции подогнаны к норме");
	}
	function patch(slot, fn) {
		(slot === "breakfast" ? setBreakfast : setDinner)((m) => ({
			...m,
			portions: fn(m.portions)
		}));
	}
	const swapping = swap ? (swap.slot === "breakfast" ? breakfast : dinner).portions[swap.index] : void 0;
	const swapIng = swapping ? resolvePortions([swapping])[0]?.ingredient : void 0;
	const altCategory = swapIng ? swapIng.category === "dairy" ? "protein" : swapIng.category === "fruit" ? "veggie" : swapIng.category : void 0;
	const alts = altCategory ? safeIngredients(diet, altCategory) : [];
	function saveJournal() {
		replaceTodayMeal(mealToLog(breakfast));
		replaceTodayMeal(mealToLog(dinner));
		toast("Завтрак и ужин записаны в журнал");
	}
	function saveAsRecipe() {
		addRecipe({
			name: `Меню ${(/* @__PURE__ */ new Date()).toLocaleDateString("ru")}`,
			ingredients: [...formatPortions(breakfast.portions), ...formatPortions(dinner.portions)],
			calories: day.kcal,
			portions: 2,
			description: mode === "usual" ? "Привычное" : `Вариант ${nonce}`
		});
		toast("Сохранено в рецепты");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6 pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "px-4 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Домашний рацион · печень"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl tracking-tight",
					children: "Питание"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-muted",
							children: "Норма дня"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-3xl tabular tracking-tight",
							children: [target, " ккал"]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-right text-xs text-subtle",
							children: [
								"в журнале ",
								logged,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"меню ",
								day.kcal
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 h-1.5 overflow-hidden rounded-full bg-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-sage",
							style: { width: `${Math.min(100, day.kcal / Math.max(1, target) * 100)}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MacroBar, {
						protein: day.protein,
						fat: day.fat,
						carbs: day.carbs
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted",
						children: [
							"Белок ",
							day.protein,
							" г · жир ",
							day.fat,
							" г (",
							fatPct,
							"%) · углеводы ",
							day.carbs,
							" г"
						]
					}),
					fatPct > 15 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-honey",
						children: "Жир выше 15% калорий — многовато при Урзахоле."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-sage",
						children: "Жир в безопасной зоне для печени."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChipRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: target === 870,
							onClick: () => setCalorieTarget(870),
							children: "Дневник 870"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
							active: target === formula,
							onClick: () => setCalorieTarget(formula),
							children: ["Формула ", formula]
						})] })
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: mode === "usual" ? "primary" : "secondary",
						onClick: loadUsual,
						children: "Привычное"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: mode === "variant" ? "primary" : "secondary",
						onClick: loadVariant,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" }), "Другой"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Собрать день",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MealCard, {
							meal: breakfast,
							onSwap: (i) => setSwap({
								slot: "breakfast",
								index: i
							}),
							onGrams: (i, g) => patch("breakfast", (p) => setPortionGrams(p, i, g))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MealCard, {
							meal: dinner,
							onSwap: (i) => setSwap({
								slot: "dinner",
								index: i
							}),
							onGrams: (i, g) => patch("dinner", (p) => setPortionGrams(p, i, g))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: fitTarget,
							children: "Подогнать"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: saveJournal,
							children: "В журнал"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "mt-1 w-full text-muted",
						onClick: saveAsRecipe,
						children: "Сохранить как рецепт"
					})
				]
			}),
			warnings.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Ограничения",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-2",
					children: warnings.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed",
						children: w
					}) }, w))
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Рецепты",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [RECIPE_LIBRARY.map((r) => {
						const t = totals(r.portions);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: r.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted",
									children: r.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-subtle",
									children: formatPortions(r.portions).join(" · ")
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [t.kcal, " ккал"] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							className: "mt-3",
							onClick: () => {
								const slot = r.id.includes("beef") ? "dinner" : "breakfast";
								const built = {
									slot,
									targetKcal: slot === "breakfast" ? split.breakfast : split.dinner,
									portions: r.portions.map((p) => ({ ...p })),
									method: "варка"
								};
								if (slot === "breakfast") setBreakfast(built);
								else setDinner(built);
								toast(`${r.name} поставлено в ${slot === "breakfast" ? "завтрак" : "ужин"}`);
							},
							children: "Подставить"
						})] }, r.id);
					}), recipes.filter((r) => !RECIPE_LIBRARY.some((x) => x.name === r.name)).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: r.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: r.ingredients.join(" · ")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-subtle",
							children: [r.calories, " ккал"]
						})
					] }, r.id))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer$1, {
				open: Boolean(swap),
				onOpenChange: (o) => !o && setSwap(null),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, {
					title: swapIng?.name ?? "Замена",
					subtitle: "Только продукты, безопасные при печени и возрасте"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sheet-scroll flex flex-col gap-1 px-5 pb-8",
					children: alts.map((ing) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							if (!swap) return;
							patch(swap.slot, (p) => swapPortion(p, swap.index, ing.id));
							setSwap(null);
						},
						className: cn("flex items-center justify-between rounded-xl bg-paper px-4 py-3 text-left transition-transform duration-150 active:scale-[0.96]", ing.id === swapIng?.id && "ring-1 ring-sage"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium",
							children: ing.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted",
							children: [
								ing.calsPer100g,
								" ккал / 100 г · жир ",
								ing.fat,
								" г",
								ing.seedsRemove ? " · без семечек" : ""
							]
						})] }), ing.id === swapIng?.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-sage",
							children: "сейчас"
						}) : null]
					}, ing.id))
				})]
			})
		]
	});
}
function ProfileScreen() {
	const data = usePetStore();
	const setOwnerNote = usePetStore((s) => s.setOwnerNote);
	const resetDemo = usePetStore((s) => s.resetDemo);
	const [note, setNote] = (0, import_react.useState)(data.profile.ownerNote);
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const weight = latestWeight(data);
	const birthday = new Date(data.profile.birthday).getTime();
	const facts = [
		["Порода", data.profile.breed],
		["Статус", data.profile.status],
		["Пол", data.profile.sex === "male" ? "Кобель" : "Сука"],
		["Возраст", ageLabel(data.profile.birthday)],
		["День рождения", formatDateLong(birthday)],
		["Окрас", data.profile.color],
		["Вес", weight ? kgLabel(weight.kg) : "—"],
		["Норма ккал", String(data.profile.calorieTarget)],
		["Корм", data.profile.food],
		["Кастрация", data.profile.neutered ? "Да" : "Нет"],
		data.profile.clinic ? ["Клиника", data.profile.clinic] : null,
		data.profile.doctor ? ["Врач", data.profile.doctor] : null,
		data.profile.chip ? ["Чип", data.profile.chip] : null
	].filter((row) => Boolean(row));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6 pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "px-4 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Профиль"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl tracking-tight",
					children: data.profile.name
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/archie/portrait.jpg",
						alt: "Арчи",
						className: "aspect-[4/5] w-full rounded-2xl object-cover object-center"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-2xl tracking-tight",
						children: data.profile.breed
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							ageLabel(data.profile.birthday),
							" · цель ",
							data.profile.targetMinKg,
							"–",
							data.profile.targetMaxKg,
							" кг"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Вес",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeightChart, { data }) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Активность",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalkWeekChart, { data }) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Карточка",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					className: "p-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", { children: facts.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3 border-b border-line px-2 py-2.5 last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-right text-sm font-medium",
							children: v
						})]
					}, k)) })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Заметка хозяина",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: note,
					onChange: (e) => setNote(e.target.value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3 w-full",
					variant: "secondary",
					onClick: () => setOwnerNote(note),
					children: "Сохранить заметку"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4",
				children: confirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: "Вернуть демо-данные Арчи и удалить ваши записи на этом устройстве?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => setConfirm(false),
						children: "Отмена"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "danger",
						onClick: () => {
							resetDemo();
							setNote(usePetStore.getState().profile.ownerNote);
							setConfirm(false);
						},
						children: "Сбросить"
					})]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					className: "w-full text-muted",
					onClick: () => setConfirm(true),
					children: "Сбросить демо-данные"
				})
			})
		]
	});
}
function WellnessRing({ value, size = 112, stroke = 6, children, className }) {
	const r = (size - stroke) / 2;
	const c = 2 * Math.PI * r;
	const offset = c * (1 - Math.min(100, Math.max(0, value)) / 100);
	const color = value >= 80 ? "var(--color-sage)" : value >= 60 ? "var(--color-honey)" : "var(--color-clay)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative shrink-0", className),
		style: {
			width: size,
			height: size
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			className: "-rotate-90",
			"aria-hidden": true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: size / 2,
				cy: size / 2,
				r,
				fill: "none",
				stroke: "var(--color-line)",
				strokeWidth: stroke
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: size / 2,
				cy: size / 2,
				r,
				fill: "none",
				stroke: color,
				strokeWidth: stroke,
				strokeLinecap: "round",
				strokeDasharray: c,
				strokeDashoffset: offset
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute overflow-hidden rounded-full bg-surface",
			style: { inset: stroke + 4 },
			children
		})]
	});
}
function TodayScreen({ onLog, onOpenCare, onOpenJournal }) {
	const data = usePetStore();
	const score = computeWellness(data);
	const weight = latestWeight(data);
	const walks = todayWalks(data);
	const water = todayWaterMl(data);
	const meals = todayMeals(data);
	const kcal = todayKcal(data);
	const schedule = todaySchedule(data);
	const insights = computeInsights(data);
	const recent = collectEvents(data).slice(0, 4);
	const days = weekDays();
	const today = startDay();
	const weekLabels = [
		"пн",
		"вт",
		"ср",
		"чт",
		"пт",
		"сб",
		"вс"
	];
	const upcomingVisit = data.visits.find((v) => v.upcoming);
	const nextMed = [...data.meds].sort((a, b) => a.nextDue - b.nextDue)[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger flex flex-col gap-6 pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-end justify-between px-4 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-sm italic text-sage",
					children: "Archie"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl tracking-tight text-ink",
					children: "Сегодня"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: formatDayShort(Date.now())
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WellnessRing, {
						value: score,
						size: 108,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/archie/portrait.jpg",
							alt: "Арчи",
							className: "size-full object-cover object-center"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl tracking-tight",
								children: data.profile.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 truncate text-sm text-muted",
								children: [
									data.profile.breed,
									" · ",
									ageLabel(data.profile.birthday)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: wellnessCaption(score) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular text-xs text-subtle",
									children: [score, "/100"]
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-7 gap-1",
					children: days.map((d, i) => {
						const active = d === today;
						const has = data.walks.some((w) => startDay(w.at) === d);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("flex flex-col items-center gap-1 rounded-lg py-2", active && "bg-paper"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium text-subtle",
								children: weekLabels[i]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", has ? "bg-sage" : "bg-line") })]
						}, d);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2 px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted",
						children: "Вес"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-2xl tabular tracking-tight",
						children: weight ? kgLabel(weight.kg) : "—"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted",
						children: "Прогулки"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-display text-2xl tabular tracking-tight",
						children: [
							walks.length,
							"/",
							data.profile.walkTargetPerDay
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-muted",
							children: "Калории"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-display text-2xl tabular tracking-tight",
							children: [
								kcal,
								"/",
								data.profile.calorieTarget
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 h-1.5 overflow-hidden rounded-full bg-line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-sage",
								style: { width: `${Math.min(100, kcal / Math.max(1, data.profile.calorieTarget) * 100)}%` }
							})
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-muted",
							children: "Вода"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-display text-2xl tabular tracking-tight",
							children: [water, " мл"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 text-xs text-subtle",
							children: [meals.length, " приёма еды"]
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-4 gap-2",
					children: [
						["walk", "Прогулка"],
						["meal", "Еда"],
						["water", "Вода"],
						["weight", "Вес"]
					].map(([type, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onLog(type),
						className: "flex flex-col items-center gap-2 rounded-2xl bg-paper py-3 transition-transform duration-150 active:scale-[0.96]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventIcon, {
							kind: type,
							className: "size-9"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium",
							children: label
						})]
					}, type))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Сегодня",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					className: "flex flex-col gap-1 p-2 pr-16",
					children: schedule.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							if (item.log === "med" && item.medId) {
								data.logMed(item.medId);
								return;
							}
							if (item.log === "meal") onLog("meal", { slot: item.slot });
							else if (item.log) onLog(item.log);
						},
						className: "flex items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-transform duration-150 active:scale-[0.96]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("flex size-7 items-center justify-center rounded-full", item.done ? "bg-sage text-sage-fg" : "border border-line bg-surface text-subtle"),
								children: item.done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "size-3.5",
									strokeWidth: 2.5
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("block text-sm font-medium", item.done && "text-muted"),
									children: item.title
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular text-xs text-subtle",
								children: item.time
							})
						]
					}, item.id))
				})
			}),
			insights[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Сводка",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-2",
					children: insights.map((ins) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-ink",
						children: ins.text
					}) }, ins.id))
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Ближайшее",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onOpenCare,
					className: "text-sm font-medium text-sage",
					children: "Питание"
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [nextMed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
						onClick: onOpenCare,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-muted",
								children: "Лекарство"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm font-medium",
								children: nextMed.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-subtle",
								children: relativeDue(nextMed.nextDue)
							})
						]
					}) : null, upcomingVisit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
						onClick: onOpenCare,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-muted",
								children: "Визит"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm font-medium",
								children: upcomingVisit.reason
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-subtle",
								children: [
									formatDayShort(upcomingVisit.at),
									" · ",
									data.profile.clinic
								]
							})
						]
					}) : null]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Недавнее",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onOpenJournal,
					className: "text-sm font-medium text-sage",
					children: "Журнал"
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					className: "flex flex-col gap-1 p-2",
					children: recent.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventRow, {
						item,
						data,
						onClick: onOpenJournal
					}, `${item.kind}-${item.data.id}`))
				})
			})
		]
	});
}
var TABS = [
	{
		id: "today",
		label: "Сегодня",
		icon: House
	},
	{
		id: "journal",
		label: "Журнал",
		icon: NotebookPen
	},
	{
		id: "nutrition",
		label: "Питание",
		icon: Utensils
	},
	{
		id: "archie",
		label: "Арчи"
	}
];
function ArchieApp() {
	const [tab, setTab] = (0, import_react.useState)("today");
	const [logOpen, setLogOpen] = (0, import_react.useState)(false);
	const [logType, setLogType] = (0, import_react.useState)(null);
	const [mealSlot, setMealSlot] = (0, import_react.useState)();
	function openLog(type, extra) {
		setLogType(type ?? null);
		setMealSlot(extra?.slot);
		setLogOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh w-full justify-center bg-canvas",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex h-dvh w-full max-w-md flex-col bg-bg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-0 flex-1 overflow-y-auto overscroll-contain pb-20 pt-[max(0.75rem,env(safe-area-inset-top))]",
					children: [
						tab === "today" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodayScreen, {
							onLog: openLog,
							onOpenCare: () => setTab("nutrition"),
							onOpenJournal: () => setTab("journal")
						}) : null,
						tab === "journal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JournalScreen, { onLog: () => openLog() }) : null,
						tab === "nutrition" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NutritionScreen, {}) : null,
						tab === "archie" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileScreen, {}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => openLog(),
					"aria-label": "Новая запись",
					className: "absolute right-4 z-30 flex size-14 items-center justify-center rounded-full bg-sage text-sage-fg shadow-lg transition-transform duration-150 active:scale-[0.96] bottom-24",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						className: "size-6",
						strokeWidth: 2
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "z-20 shrink-0 border-t border-line bg-bg pb-[env(safe-area-inset-bottom)]",
					"aria-label": "Разделы",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-4 px-2 pt-1",
						children: TABS.map((t) => {
							const active = tab === t.id;
							const Icon = t.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setTab(t.id),
								className: cn("flex min-h-14 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors duration-150", active ? "text-sage" : "text-subtle"),
								children: [Icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-5",
									strokeWidth: active ? 2.2 : 1.8
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/archie/portrait.jpg",
									alt: "",
									className: cn("size-6 rounded-full object-cover object-center", active && "ring-2 ring-sage ring-offset-1 ring-offset-bg")
								}), t.label]
							}, t.id);
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogSheet, {
					open: logOpen,
					onOpenChange: setLogOpen,
					initialType: logType,
					mealSlot
				})
			]
		})
	});
}
function Home() {
	(0, import_react.useEffect)(() => {
		try {
			usePetStore.persist.rehydrate();
		} catch {}
		usePetStore.setState({ hydrated: true });
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchieApp, {});
}
//#endregion
export { Home as component };
