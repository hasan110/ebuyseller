<template>
  <div class="site-wrapper">
    <site-header link="my_shops">
      <template v-slot:title>
        فروشگاه
      </template>
    </site-header>
    <site-top-navigation></site-top-navigation>
    <site-section title="ویرایش محصول">
      <template v-slot:icon>
        <i class="mdi mdi-archive-check-outline"></i>
      </template>
    </site-section>

    <div class="body-wrapper">
      <div class="body-inner py-3">

        <v-container>
          <v-row>

            <v-col
                cols="12"
                sm="12"
                md="6"
            >
              <v-text-field
                  label="نام محصول"
                  outlined dense
                  v-model="product.name"
                  :error-messages="errors.name"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="12"
                md="6"
            >
              <v-text-field
                  type="number"
                  class="ltr text-left"
                  label="قیمت"
                  outlined dense persistent-hint
                  :hint="product.price ? formatPrice(product.price)+' تومان ' : 0+' تومان '"
                  v-model="product.price"
                  :error-messages="errors.price"
              ></v-text-field>
            </v-col>

            <v-col
                cols="12"
            >
              <v-textarea
                  outlined
                  label="توضیحات بیشتر"
                  v-model="product.description"
                  :error-messages="errors.description"
              ></v-textarea>
            </v-col>
            <v-col
                cols="12"
                sm="12"
                md="6"
            >
              <v-text-field
                  type="number"
                  class="ltr"
                  label="تعداد موجودی"
                  outlined dense
                  v-model="product.inventory"
                  :error-messages="errors.inventory"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="12"
                md="6"
            >
              <v-select
                  item-text="title"
                  item-value="id"
                  :items="categories"
                  label="ویرایش دسته بندی"
                  outlined dense
                  v-model="product.categories"
                  :error-messages="errors.categories"
              ></v-select>
            </v-col>

          </v-row>

          <div class="file-input-wrapper">
            <div class="file-input-inner">

              <label for="add_file" class="add-file">
                <input @change="select_picture" type="file" ref="add_file" id="add_file">
                <div class="icon"><i class="mdi mdi-plus"></i></div>
                <div class="titr">افزودن تصویر</div>
              </label>

              <div v-for="(file , key) in product.files" :key="key" class="file-preview">
                <img :src="ImageUrl + file.path">
              </div>

              <div v-for="(img , i) in product.new_images" :key="'a'+i" class="file-preview">
                <img :src="img">
              </div>

            </div>
          </div>

        </v-container>

        <div class="absolute-action-wrapper">
          <div class="absolute-action">
            <button v-if="!loading" class="px-btn size-md px-btn-info block" @click="editProduct()">ثبت</button>
            <button v-else class="px-btn size-md px-btn-info disabled block">ثبت</button>
          </div>
        </div>

      </div>
    </div>

    <v-dialog
        v-model="crop_dialog"
        persistent
        max-width="450px"
    >
      <v-card>
        <v-card-title>
          <h3>برش تصویر</h3>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                <div class="cropper-wrapper">
                  <cropper
                      ref="picture_cropper"
                      classname="cropper"
                      :src="selected_picture"
                      :auto-zoom="true"
                      :stencil-size="{
                      width: 280,
                      height: 280
                    }"
                      image-restriction="stencil"
                      @change="picture_cropped"
                  ></cropper>
                </div>
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="p-3">
          <v-spacer></v-spacer>
          <!-- <button class="px-btn size-md px-btn-danger mx-3" @click="crop_dialog = false">انصراف</button> -->
          <button class="px-btn size-md px-btn-primary" @click="crop_dialog = false">برش</button>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </div>
</template>
<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
export default {
  name: 'edit_product',
  components:{
    Cropper,
  },
  data : () => ({
    errors:{},
    categories:[],
    product:{
      new_images: []
    },
    product_id:null,
    selected_picture:null,
    loading:false,
    crop_dialog:false,
  }),
  methods: {
    select_picture(event){
      const pic = event.target.files[0];
      this.selected_picture = URL.createObjectURL(pic);
      this.product.new_images.push('item');
      this.crop_dialog = true
    },
    picture_cropped() {
      const { coordinates , canvas } = this.$refs.picture_cropper.getResult();
      const img = canvas.toDataURL("image/png", 0.1);
      console.log(this.product.new_images)
      this.product.new_images[this.product.new_images.length - 1] = img;
    },
    getProduct(){
      const token = this.getToken()

      this.$axios.post(`store/get-product-data`,{id:this.product_id},
      {
        headers: {
          'x-api-key':token
        }
      })
      .then(res => {
        this.product = res.data.data
      })
      .catch(err => {
        this.$router.replace({name:'my_shops'});
      });
    },
    editProduct(){
      this.loading = true
      const token = this.getToken()

      const form = new FormData;

      for (const [key, value] of Object.entries(this.product)) {
        if(value && key !== 'images' && key !== 'new_images')
        {
          form.append(key , value);
        }
      }

      if(this.product.new_images !== undefined)
      {
        for (var i = 0; i < this.product.new_images.length; i++ ){
          let file = this.product.new_images[i];
          form.append('new_images[' + i + ']', file);
        }
      }

      this.$axios.post(`store/edit-product`,form,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-api-key':token
        }
      })
      .then(res => {
        this.$notify({
          group: 'foo',
          type: 'success',
          duration: 5000,
          text: res.data.message
        });
        this.loading = false
        this.errors = {}
        this.$router.replace({name:'my_shops'})
      })
      .catch(err => {
        const error = err.response.data;
        if(error.message){
          this.$notify({
            group: 'foo',
            type: 'error',
            duration: 5000,
            text: error.message
          });
        }else{
          this.errors = error.errors
        }
        this.loading = false
      });
    },
    getCategoryList(){
      const token = this.getToken()
      this.$axios.get(`store/get-categories`,
        {
          headers: {
            'x-api-key':token
          }
        })
        .then(res => {
          this.categories = res.data.data
        })
        .catch( () => {
        });
    }
  },
  created() {
    this.checkAuth();
    window.scrollTo(0 , 0);
    if(this.$route.params.id !== ''){
      this.product_id = this.$route.params.id;
      this.getProduct()
    }else{
      this.$router.replace({name:'my_shops'});
    }
  },
  mounted() {
    this.getCategoryList()
  }
}
</script>