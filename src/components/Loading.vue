<template>
	<div class="modal" v-if="loading">
        <div class="spinner">
            <div class="spinnerBar1"></div>
            <div class="spinnerBar2"></div>
            <div class="spinnerBar3"></div>
            <div class="spinnerBar4"></div>
            <div class="spinnerBar5"></div>
        </div>
    </div>
</template>


<script lang="babel">
	
	export default {
        created(){
            console.log("loading is created")
            console.log(this.loading);
        },
		props:{
			loading:{
				type:Boolean,
				default:false
			}
		}
	}

</script>


<style>
	
	.modal{
		display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        height:100%;
        width: 100%;
        align-items:  center;
        position: absolute;
        /*visibility: hidden;*/
        left: 0;
        top: 0;
        z-index: 100;
        background-color: rgba(153,153,153,0.5);/* IE9、标准浏览器、IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂 */
	}



	   .spinner {
            width: 100px;
            height: 60px;
            font-size: 10px;
        }
        
        .spinner > div {
            background-color: limegreen;
            height: 100%;
            width: 6px;
            display: inline-block;
            -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
            animation: stretchdelay 1.2s infinite ease-in-out;
        }
        
        .spinner .spinnerBar2 {
            -webkit-animation-delay: -1.1s;
            animation-delay: -1.1s;
        }
        
        .spinner .spinnerBar3 {
            -webkit-animation-delay: -1.0s;
            animation-delay: -1.0s;
        }
        
        .spinner .spinnerBar4 {
            -webkit-animation-delay: -0.9s;
            animation-delay: -0.9s;
        }
        
        .spinner .spinnerBar5 {
            -webkit-animation-delay: -0.8s;
            animation-delay: -0.8s;
        }
        
        @-webkit-keyframes stretchdelay {
            0%,
            40%,
            100% {
                -webkit-transform: scaleY(0.4)
            }
            20% {
                -webkit-transform: scaleY(1.0)
            }
        }
        
        @keyframes stretchdelay {
            0%,
            40%,
            100% {
                transform: scaleY(0.4);
                -webkit-transform: scaleY(0.4);
            }
            20% {
                transform: scaleY(1.0);
                -webkit-transform: scaleY(1.0);
            }
        }

</style>