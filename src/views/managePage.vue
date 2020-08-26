<template>
  <div id="manage" >
    <h2>欢迎来到后台管理</h2>
    <div class="listPage">
        <a @click="showList(1)">全部请假条</a>
        <a @click="showList(2)">审核成功</a>
        <a @click="showList(3)">未审核</a>
        <a @click="showList(4)">审核失败</a>
    </div>
    <div class="showPage">
        <getNote v-if="showAll"  @sendNote="allNote" ref="getnote"></getNote>
        <successNote v-if="showSuccess" ref="successNote"></successNote>
        <withoutNotes v-if="showWithout" ref="withoutNote"></withoutNotes>
        <failNote v-if="showFail" ref="failNote"></failNote>
    </div>
  </div>
</template>
<script>
    import getNote from '../components/getNote'
    import successNote from '../components/successNote'
    import withoutNotes from '../components/withoutNotes'
    import failNote from '../components/failNote'
    export default {
        components:{getNote,successNote,withoutNotes,failNote},
        data(){
            return{
                all:'',
                showAll:true,
                showSuccess:false,
                showWithout:false,
                showFail:false,
                notes:[],
                
            }
        },
        methods:{
            showList(value){
                if(value=='1'){
                    this.showAll=true;
                    this.showSuccess=false;
                    this.showWithout=false;
                    this.showFail=false;
                    this.$refs.getnote.getNote;
                }
                if(value=='2'){
                    this.showAll=false;
                    this.showSuccess=true;
                    this.showWithout=false;
                    this.showFail=false;
                    this.$refs.successNote.allNote;
                }
                if(value=='3'){
                    this.showAll=false;
                    this.showSuccess=false;
                    this.showWithout=true;
                    this.showFail=false;
                    this.$refs.withoutNote.allNote;
                }
                if(value=='4'){
                    this.showAll=false;
                    this.showSuccess=false;
                    this.showWithout=false;
                    this.showFail=true;
                    this.$refs.failNote.allNote;
                }
            },
            allNote(datas){
                this.notes=datas;
                console.log(this.notes);
            }
        },
    }
    </script>

<style scoped>
#manage {
    height: 700px;
    overflow-y: scroll;
}
 .listPage {
    background-color: rgba(7, 77, 16, 0.616);
    width: 80%;
    line-height:40px;
    text-align: left;
}
.listPage a {
    margin: 0px 50px 0px 50px;
    cursor: pointer;
    color: white;
}
.showPage {
    width: 80%;
    min-height: 400px;
    margin: 0px auto;
}

</style>
