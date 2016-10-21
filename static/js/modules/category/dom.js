define(function(require) {
	return {
		essay: [
			'{{ each list as post i }}',
			    '<div class="essay">',
			        '<div class="tags">',
			        	'{{ if post.categories != "" }}',
			        		'{{ each post.categories as category i }}',
				                '<span class="{{category}}">{{ category }}</span>',
							'{{ /each }}',
			        	'{{ /if }}',            
			        '</div>',
			        '<div class="special">',
			            '<div class="article">',
			                '<div class="title-box">',
			                    '<div class="title">{{ post.title }}</div>',
			                    '<div class="stars">',
			                        '{{ each post.star_array as value i }}',
			                            '{{ if i < post.star }}',
			                                '<span class="star active">&#xe603;</span>',
			                            '{{ else }}',
			                                '<span class="star">&#xe603;</span>',
			                            '{{ /if }}',
			                        '{{ /each }}',
			                    '</div>',
			                '</div>',
			                '<div class="description">{{ post.desc }}</div>',
			            '</div>',
			            '<div class="img-box">',
			                '<img src="{{ post.image }}" />',
			            '</div>',
			        '</div>',
			        '<div class="more">',
			            '<div class="icon read-more"><span><a class="a-target" href="{{post.url}}">Read More +</a></span></div>',
			            '<div class="icon time">',
			                '<span>&#xe619;</span>',
			            '</div>',
			            '<div class="icon position">',
			                '<span>&#xe61b;</span>',
			            '</div>',
			            '<div class="icon wx">',
			                '<span>&#xe617;</span>',
			            '</div>',
			        '</div>',
			    '</div>',
			'{{ /each }}'
		].join('')
	}
});