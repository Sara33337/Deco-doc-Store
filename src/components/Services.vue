<script setup>
import wood_icon from '@/assets/icons/wood.svg'
import home_icon from '@/assets/icons/home-16.svg'
import hammer_icon from '@/assets/icons/hammer.svg'


const services = [
  {
    title : "أرفف خشبية",
    description : "أرفف خشبية مصممة خصيصا لتناسب مساحتك بشكل مثالي . كل قطعة مصمة لتناسب احتياجك",
    icon : wood_icon
  },

    {
    title : "ديكور داخلي",
    description : "حلول تصميم داخلي متاكلمة تجمع بين الوظائف العملية والجمال الطبيعي لمنزلك.",
    icon : home_icon
  },

   {
    title : "حرف خشبية",
    description : "قطع ديكور مصنوعة يدويا تضفي الدفء والشخصية علي أي غرفة. مصنوعة من مواد مستدامة. ",
    icon : hammer_icon

  }
]
</script>

<template>
  <div dir="rtl" id="services">
    <h2 class="text-2xl md:text-[1.7rem] font-bold mb-8 text-right ">خدماتنا:</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
     <div 
  v-for="service in services" 
  :key="service.title" 
  class="card w-full rounded-xl bg-white border border-subtitle transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl hover:cursor-pointer"
>
        <div class="card-body text-right items-start">
          
          <!-- حاوية الأيقونة -->
          <div class="w-16 h-16 flex items-center justify-center bg-[#AFADA2]/70 rounded-2xl p-3 shadow-sm border border-white/20 mb-4">
            <img 
              :src="service.icon" 
              :alt="service.title" 
              class="w-12 h-12 object-contain drop-shadow-sm" 
            />
          </div>

          <!-- النصوص -->
          <h2 class="card-title text-2xl mb-2 font-medium text-main">{{ service.title }}</h2>
          <p class="text-subtitle leading-relaxed font-medium text-lg">{{ service.description }}</p>
          
        
        </div>
      </div>
      
    </div>
  </div>
</template>