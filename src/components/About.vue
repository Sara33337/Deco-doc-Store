<script setup>
import { ref } from 'vue'

const steps = [
  {
    title: "من مجرد فكرة.. لقطعة تملأ بيتك حياة.",
    desc: "بدأنا في Deco Doc بفكرة بسيطة: ليه نسيب المساحات الفاضية في البيت من غير روح؟ قررنا نحول كل ركن مهمل لقطعة ديكور بتجمع بين الشكل الجمالي والوظيفة العملية.",
    img: "/images/shelf.svg"
  },
  {
    title: "بنسمع مساحتك.. ونقترح عليكي الأنسب.",
    desc: "مش بس بنبيع خشب، إحنا بنصمم معاكي. بنعرف المساحة فين؟ واحتياجك إيه (كتب، أكواب، قهوة؟). لو محتارة، فريقنا بيقترح عليكي المقاسات والألوان اللي تليق على عفش بيتك عشان نضمن إنها مش مجرد قطعة، دي جزء من روح البيت.",
    img: "/images/shelves.svg"
  },
  {
    title: "خشب طبيعي.. لعمر طويل.",
    desc: "سر الجمال في الأساس. إحنا بنستخدم خشب طبيعي مش (MDF). الخشب الطبيعي بيعيش سنين، بيتحمل الأوزان، ومقاوم للرطوبة، والأهم إن ملمسه وشكله بيعطي فخامة مستحيل الـ MDF يوصلها.",
    img: "/images/wood.svg"
  }
,
  {
    title:"بين القشرة والدهان.. تولد التحفة.",
    desc: "هنا تبدأ الحرفة؛ بنركب القشرة الطبيعية بدقة لو مطلوبة، وبعدها بتيجي مرحلة الدهان اللي بتبرز جمال العروق الخشبية وبتحميها. كل لمسة بنعملها بتتعمل يدويًا بحب.",
    img: "/images/paint.svg"
  }
  ,
  {
    title:"قطعتك المفضلة.. في طريقها لبيتك.",
    desc: "مش بنشحن غير لما نبعتلك صورة القطعة بعد التنفيذ وتتأكدي إنها زي ما تخيلتي بالظبط. بعدها بنغلفها بعناية ونوصلها ليكي لحد باب البيت، جاهزة عشان تزين ركنك المفضل.",
    img: "/images/packaging.svg"
  }
]

const activeIndex = ref(0)

const onScroll = (e) => {
  const { scrollLeft, clientWidth } = e.target
  // Calculate index based on horizontal offset
  activeIndex.value = Math.round(scrollLeft / clientWidth)
}
</script>

<template>
  <div class="relative overflow-hidden flex flex-col" id="about">
    <h2 dir="rtl" class="text-2xl md:text-[1.7rem] font-bold mb-10 md:mb-0">قصتنا : </h2>
    
    <!-- Horizontal Scroll Container -->
   <div 
  @scroll="onScroll"
  class="flex-1 flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
>
  <div 
    v-for="(step, i) in steps" 
    :key="i"
    class="min-w-full h-full snap-center flex items-center justify-center text-center"
  >
    <!-- التعديل هنا: خليناها flex-col للموبايل و flex-row-reverse للكبير -->
    <!-- واديناها w-full عشان تاخد العرض كامل و items-center للتوسط -->
    <div class="w-full max-w-6xl h-170 md:h-120 flex flex-col md:flex-row items-center gap-12" dir="rtl">
      <div class="w-full md:w-1/4 shadow-md overflow-hidden border border-base-300 rounded-2xl">
        <figure>
          <img :src="step.img" :alt="step.title" class="h-80 md:h-96 w-full object-cover" />
        </figure>
      </div>

      <!-- حاوية النص: هتاخد نص العرض التاني وتكون محاذاته لليمين -->
      <div class="w-full md:w-2/4 text-right">
        <h1 class="text-xl md:text-2xl font-semibold mb-4 leading-tight">
          {{ step.title }}
        </h1>
        <p class="text-lg md:text-xl text-subtitle leading-relaxed">
          {{ step.desc }}
        </p>
      </div>

    </div>
  </div>
</div>

    <!-- Dynamic Height Pagination Dots -->
    <div class="absolute bottom-12 left-0 right-0 flex justify-center items-end gap-3 h-10">
      <div 
        v-for="(_, i) in steps" 
        :key="i"
        class="w-2.5 rounded-full transition-all duration-500 ease-in-out"
        :class="[
          activeIndex === i 
            ? 'w-10 h-2.5 bg-dots shadow-lg shadow-primary/30' 
            : 'h-2.5 bg-dots'
        ]"
      ></div>
    </div>

    <!-- Navigation Overlay -->
    <!-- <div class="p-6 flex justify-between items-center bg-base-100 border-t border-base-300">
      <button class="btn btn-ghost">Skip</button>
      <button class="btn btn-primary px-8">
        {{ activeIndex === steps.length - 1 ? 'Finish' : 'Next' }}
      </button>
    </div> -->

  </div>
</template>

<style scoped>
/* Hide scrollbar logic */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>