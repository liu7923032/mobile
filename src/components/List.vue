<template>
	<ul>
    <li v-for="item in items" >
      <a>
        <partial :name="templateName"></partial>
      </a>
    </li> 
  </ul>
</template>

<script >
	var List={
		created(){
			this.items=this.data;
		},
		partials:{
			'default': '<span v-html="item"></span>',
		},
		props:{
			data:{
				type:Array,
				default(){
					return [];
				}
			},
			templateName: {
       			 type:String,
        		default: 'default'
      		},
		},
		data(){
			return {
				items:[],
				template:''
			}
		}

	}
	export  default List
</script>