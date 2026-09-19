import { journalArticles, type JournalArticle } from '@/content/journal'
import { podcastEpisodes, type PodcastEpisode } from '@/content/podcast'
import { stories, type Story } from '@/content/stories'
import { videos, type VideoItem } from '@/content/videos'
import { NAV_ITEMS, SOCIAL_LINKS, type NavItem } from '@/lib/nav'
import savedContent from '@/content/published-content.json'

/** The complete editable document transported between the admin and GitHub. */
export type SiteContent = {
  homepage: Record<string, string>
  about: Record<string, string>
  pages: Record<string, { label: string; title: string; intro: string }>
  navigation: (NavItem & { visible?: boolean })[]
  footer: { title: string; email: string; contactLabel: string; motto: string; copyright: string; credit: string; owner: string; socials: { label: string; href: string }[] }
  seo: { title: string; description: string; ogTitle: string; ogDescription: string; ogImage: string }
  podcasts: (PodcastEpisode & { visible?: boolean; featured?: boolean })[]
  journal: (JournalArticle & { visible?: boolean; featured?: boolean })[]
  stories: (Story & { visible?: boolean; featured?: boolean })[]
  videos: (VideoItem & { visible?: boolean; featured?: boolean })[]
}

const defaultPublishedContent: SiteContent = {
  homepage: {
    heroEyebrow: '01 / SISU', heroName: 'Təhminə Doruk', heroTitle: 'SISU FREE\nSOUL', heroTagline: 'Öz həyatının müəllifi ol.', heroDescription: 'Hazır qəliblərdən çıx. Öz yolunu seç. Öz həqiqətini yarat.', heroCtaLabel: 'Hekayəni kəşf et', heroCtaHref: '/about', heroImage: '/images/tahmina/5219684625851032054.jpg',
    heroImageAlt: 'Təhminə səhər işıqları fonunda.', manifestoLabel: 'SISU', manifestoLineOne: 'Azadlıq istədiyin hər şeyi etmək deyil.', manifestoLineTwo: 'Azadlıq — öz həyatını seçmək və onun müəllifi olmaqdadır.', manifestoDescription: 'SISU — insanın içindəki daxili gücüdür, ən çətin anlarda belə davam etmək iradəsi və ruhunun dayanıqlılığıdır.', manifestoLines: 'Hiss edirəm.\nMüşahidə edirəm.\nSorğulayıram.\nAraşdırıram.\nVə sonda öz həqiqətimi\nözüm yaradıram.', interludeLabel: 'A QUIET DECISION', interludeLineOne: 'Bəzən öz yolun', interludeLineTwo: 'sadəcə bir addımdan başlayır.',
    tahmineLabel: 'TƏHMİNƏ', tahmineImage: '/images/tahmina/5219684625851032051.jpg', tahmineImageAlt: 'Təhminə Doruk, təbii gecə işığında.', tahmineCaption: 'Təhminə Doruk / Bakı', tahmineTitle: 'Mən\nkiməm?', tahmineSisuTitle: 'SISU\nFree Soul\nnədir?', tahmineDescription: 'Hər zaman axtarışda olan, azadlığını hər şeydən üstün tutan, həyatın dərin mənasını və öz yolumu tapmağa çalışan bir qadınam. Həyatı doya-doya yaşayan, sadəcə özünü bir cümlə və ya bir qəliblə məhdudlaşdırmaq istəməyən bir insanam.', tahmineQuote: 'SISU – Free Soul, həyatın içində özünü itirmədən, özün olaraq yaşamağın mümkün olduğuna inanan bir məkandır.', tahmineCta: 'Hekayəmi oxu', tahmineCtaHref: '/about', signatureLeftImage: '/images/tahmina/5219684625851032051.jpg', signatureLeftAlt: 'Təhminə açıq havada.', signatureRightImage: '/images/tahmina/5219684625851032054.jpg', signatureRightAlt: 'Təhminənin kinematik portreti.', signatureWideImage: '/images/tahmina/5219684625851032047.jpg', signatureWideAlt: 'Təhminənin geniş film kadrı.', signatureQuote: 'Bəzən yol görünmür — çünki onu özün addım-addım yaradırsan.', podcastLabel: 'PODCASTLAR', podcastTitle: 'SISU\nPODCASTLAR', podcastDescription: 'İnanmaqdan əvvəl sorğula. Hazır cavabların arxasınca getməkdənsə, birlikdə daha dərinə baxaq.', podcastCta: 'Bütün epizodlar', podcastCtaHref: '/podcast', podcastFeatureText: 'Təhminə Doruk × Senan — two perspectives, one conversation.', watchLabel: 'WATCH', watchTitle: 'Fikirlər\nvə\nSöhbətlər.', watchDescription: 'Fərqli fikirlər, ortaq suallar, yeni baxışlar', watchCta: 'İzləməyə başla', watchCtaHref: '/videos', journalLabel: 'YAZILAR', journalTitle: 'Həqiqətlər', journalCta: 'Hamısını oxu', journalCtaHref: '/journal', storiesLabel: 'HEKAYƏLƏR', storiesTitle: 'Hekayələrimiz\nbizi dəyişdirir.', storiesDescription: 'Hər hekayənin arxasında yaşanmış bir həyat, hiss edilmiş bir dünya var.', storiesCta: 'Bütün hekayələr', storiesCtaHref: '/stories',
    contactLabel: 'WORK TOGETHER', contactTitle: 'Bəzən cavab lazım deyil.\nDoğru sual lazımdır.', contactDescription: 'Təhminə ilə iş bir həll paketi deyil. Sakit, dürüst və sənin suallarına yer açan söhbətdir.', contactCta: 'Söhbətə başlayaq', contactHref: '/contact', contactPageTitle: 'Dürüst bir söhbət üçün yer var.', contactPageDescription: 'Fərdi söhbətlər, workshoplar, çıxışlar və yaradıcı əməkdaşlıqlar üçün yaz.', closingTitle: 'Öz yolunu seçmək həmişə asan deyil.', closingText: 'Amma həyatının müəllifi olmaq — bəlkə də ən böyük azadlıqdır.', closingImage: '/images/tahmina/5219684625851032047.jpg', closingImageAlt: 'Təhminənin sakit anı.',
  },
  about: { heroLabel: '01 / TƏHMİNƏ', heroTitle: 'Mən\nkiməm?', heroDescription: 'SISU mənim üçün öz həqiqətinə uyğun yaşamaq cəsarətidir.', heroImage: '/images/tahmina/5219684625851032048.jpg', heroImageAlt: 'Təhminə Doruk şəhər fonunda.', scrollLabel: 'Aşağı kəşf et ↓', introLabel: '02 / SISU', introTitle: 'Özünü hazır qəlibə salmaq yox, özünə uyğun yolu və həyatı yaratmaq.', introDescription: 'Təhminənin hekayəsi nəticədən çox müşahidə, sual və seçim haqqındadır. Bu səhifə həmin baxışı yavaş-yavaş açır.', quote: 'Öz həyatını\nözün seçmək\ncəsarətdir.', freedomLabel: 'SISU / BAXIŞ', wideImage: '/images/tahmina/5219684625851032054.jpg', wideImageAlt: 'Təhminənin sakit şəhər portreti.', freedomTitle: 'Azadlıq istədiyin hər şeyi etmək deyil.', freedomText: 'Azadlıq — öz həyatını seçmək və onun müəllifi olmaqdadır.', contactCta: 'Söhbətə başlayaq', contactHref: '/contact' },
  pages: {
    about: { label: '01 / TƏHMİNƏ', title: 'Mən kiməm?', intro: '' },
    journal: { label: 'JOURNAL', title: 'Düşüncələr', intro: 'Tələsmədən baxmaq, soruşmaq və öz səsini yenidən eşitmək üçün qeydlər.' },
    podcast: { label: 'SISU CONVERSATIONS', title: 'Podcast', intro: 'Həyat, münasibətlər, seçimlər, qorxular və insan olmaq haqqında filtrlənməmiş söhbətlər.' },
    videos: { label: 'WATCH', title: 'Fikirlər. Hekayələr. Söhbətlər.', intro: 'Qısa filmlər, kadrarxası və düşünməyə davam edən vizual esselər.' },
    stories: { label: 'STORIES', title: 'Hekayələrimiz bizi dəyişdirir.', intro: 'İnsanların öz yolunu tapmaq üçün verdiyi sakit, cəsarətli qərarlar.' },
    contact: { label: 'CONTACT', title: 'Söhbətə başlayaq.', intro: 'Bir sualın, fikrin və ya əməkdaşlıq təklifin varsa, buradan başlaya bilərik.' },
  },
  navigation: NAV_ITEMS.map((item) => ({ ...item, visible: true })),
  footer: { title: 'FREE SOUL.', email: 'hello@sisufreesoul.com', contactLabel: 'Söhbətə başlayaq →', motto: 'Öz həyatının müəllifi ol.', copyright: '© SISU Free Soul 2026', credit: 'Made with courage.', owner: 'Təhminə Doruk', socials: SOCIAL_LINKS },
  seo: { title: 'SISU Free Soul — Öz həyatının müəllifi ol', description: 'Təhminə Doruk — həyat, azadlıq və dürüst söhbətlər. Hazır qəliblərdən çıx, öz yolunu seç, öz həqiqətini yarat. Podcast, videolar, düşüncələr və hekayələr.', ogTitle: 'SISU Free Soul — Öz həyatının müəllifi ol', ogDescription: 'Həyat, azadlıq və dürüst söhbətlər. Öz yolunu seç, öz həqiqətini yarat.', ogImage: '/images/sisu-hero-poster.png' },
  podcasts: podcastEpisodes.map((item, index) => ({ ...item, visible: true, featured: index === 0 })),
  journal: journalArticles.map((item, index) => ({ ...item, visible: true, featured: index === 0 })),
  stories: stories.map((item, index) => ({ ...item, visible: true, featured: index === 0 })),
  videos: videos.map((item, index) => ({ ...item, visible: true, featured: index === 0 })),
}

/** A published Git revision replaces the built-in migration snapshot after the first CMS publication. */
export const publishedContent: SiteContent = Object.keys(savedContent).length
  ? savedContent as SiteContent
  : defaultPublishedContent
