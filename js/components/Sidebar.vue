<template>
	<div>
		
	</div>

</template>






<script>
	

</script>





<style>
	

</style>



		<div class="modal" tabindex="-1" role="dialog">
		  	<div class="modal-dialog" role="document">
		    	<div class="modal-content">
		      		<div class="modal-header">
		        		<h5 class="modal-title">Modal title</h5>
		        		<button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          			<span aria-hidden="true">&times;</span>
		        		</button>
		      		</div>
		      		<div class="modal-body">
		        		<p>Modal body text goes here.</p>
		      		</div>
		      		<div class="modal-footer">
		        		<button type="button" class="btn btn-primary">Save changes</button>
		        		<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		    	  	</div>
		    	</div>
		  	</div>
		</div>



Vue.component('createCharacter', {
	template: `
		<div class="modal-dialog" role="document">
	        <div class="modal-content">
	            <div class="modal-header">
	                <h5 class="modal-title" id="exampleModalLabel">New Character</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true">&times;</span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	Here is where we will put in character details.
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
	                <button type="button" class="btn btn-primary">Continue</button>
	            </div>
	        </div>
	    </div>
	`
});