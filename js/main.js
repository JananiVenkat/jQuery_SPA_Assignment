$(function(){
	let $grains=$('#grains');
	let $Particulars=$('#Particulars');
	let $value=$('#value');

	UpdateGraph();
	jQuery.support.cors=true;

	let grainTemplate=""+
	"<tr>"+
	"<td>{{Particulars}}</td>"+
	"<td>{{value}}</td>"+
	"<td><button data-id='{{Particulars}}' class='btn btn-default btn-danger remove'>Delete</button></td>"+
	"</tr>";//using mustache Template


	$.ajax({
		type:'GET',
		url:'http://localhost:3000/data',
		success:function(grains){

			 $grains.append("<tr id='table-head'><th>Particulars</th><th>Value</th><th></th></tr>");
		
		$.each(grains,function(i,item){	
			addNew(item);	
			
			
			});
	},
	error:function()
	{
		alert("error loading Foodgrains");
	}
	});

function addNew(item)
{
	$grains.append(Mustache.render(grainTemplate,item));
}


	$('#add-grains').on('click',function(){
		
		let add_FoodGrain={
			Particulars:$Particulars.val(),
			value:$value.val(),
		};
		$.ajax({
			type:'POST',			
			url:'http://localhost:3000/data',
			dataType:'json',
			data:add_FoodGrain,
			success:function(new_FoodGrain){
				
				
				addNew(new_FoodGrain);
				$('svg').remove();
				UpdateGraph();
				

			},
			error:function()
			{
				alert("error saving Food grains Data");
			}

		});
	});

	$grains.delegate('.remove','click',function(){
		let $tr=$(this).closest('tr');
		$.ajax({
			type:'DELETE',
			url:'http://localhost:3000/data/'+$(this).attr('data-id'),
			success:function()
			{   $('svg').remove();
				UpdateGraph();
				$tr.remove();
				
			}
		});
	});
});
