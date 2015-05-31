socialNetwork.controller("newsFeedController", ['$scope', 'postService', 'notifyService', 'baseProfileImage', 'friendsService', '$routeParams',
    function ($scope, postService, notifyService, baseProfileImage, friendsService, $routeParams) {
        $scope.newsFeedData = [];
        $scope.postsOwner = '';
        $scope.postsStartId = '';
        $scope.editPostShown = false;
        $scope.editPostData = [];
        $scope.editPostOldText = '';
        $scope.addCommentPanelVisible = false;
        $scope.addCommentPostData = [];
        $scope.editCommentPanelVisible = false;
        $scope.editCommentPostId = 0;
        $scope.editCommentPostData = [];
        $scope.editCommentOldText = '';
        $scope.commentUserStatus = '';

        $scope.likePost = function(postId){
            $scope.newsFeedData.forEach(function(post){
                if(post.id == postId){
                    if(post.author.isFriend ||
                        post.wallOwner.isFriend ||
                        post.author.username == $localStorage['username'] ||
                        post.wallOwner.username ==$localStorage['username']){
                        postService.likePost(postId)
                            .seccess(function(data) {
                                post.liked = true;
                                post.likesCount = post.likesCount + 1;
                            })
                               .error(function () {
                                notifyService.showError('Error, try to like again later.');
                            })
                    }
                    else{
                        notifyService.showError('You can only like/unlike your posts or your friends posts!');
                    }
                }
            });
        };

        $scope.unlikePost = function(postId){
            $scope.newsFeedData.forEach(function(post){
                if(post.id == postId){
                    if(post.author.isFriend ||
                        post.wallOwner.isFriend ||
                        post.author.username == sessionStorage['username'] ||
                        post.wallOwner.username ==sessionStorage['username']) {
                        postService.unlikePost(postId)
                            .success(function(data) {
                                $scope.newsFeedData.forEach(function(post){
                                    if(post.id == postId){
                                        post.liked = false;
                                        post.likesCount = post.likesCount - 1;
                                    }
                                });
                            })
                            .error(function () {
                                notifyService.showError('Error, try to like again later.');
                            })
                    }
                    else{
                        notifyService.showError('You can only like/unlike your posts or your friends posts!');
                    }
                }
            })
        };

        $scope.showCommentAddPanel = function(postId){
            $scope.newsFeedData.forEach(function(post){
                if(post.id == postId) {
                    if(post.author.username == sessionStorage['username'] || post.wallOwner.isFriend || post.wallOwner.username == sessionStorage['username']){
                        $scope.addCommentPostData = post;
                        $scope.addCommentPanelVisible = true;
                    }
                    else{
                        notifyService.showError('You can comment only your posts or friends posts!');
                        $scope.addCommentPanelVisible = false;
                    }
                }
            });
        };

        $scope.showEditPost = function(postId){
            $scope.newsFeedData.forEach(function(post){
                if(post.id == postId) {
                    if (post.author.username == sessionStorage['username']) {
                        $scope.editPostOldText = post.postContent;
                        $scope.editPostData = post;
                        $scope.editPostShown = true;
                    }
                    else {
                        notifyService.showError('You can edit only your posts!');
                        $scope.editPostShown = false;

                    }
                }
            });
        };

        $scope.deletePost = function(postId){
            var postCounter = 0;
            var postPosition = 0;
            $scope.newsFeedData.forEach(function(post){
                if(post.id == postId){
                    if(post.author.username == sessionStorage['username'] ||
                        post.wallOwner.username == sessionStorage['username']){
                        postPosition = postCounter;
                        postService.deletePost(postId)
                            .success(function(data) {
                                notifyService.showInfo('Post Successfully Deleted.');
                            })
                            .error(function (error) {
                                notifyService.showError('Post Delete Failed! Try Again!');
                            })
                    }
                    else{
                        notifyService.showError('You can delete your or your wall posts!');
                    }
                }
                postCounter++;
            });

            $scope.newsFeedData.splice(postPosition, 1);
        };

        $scope.ShowMoreComments = function(postId){
            $scope.newsFeedData.forEach(function(post){
                if(post.id == postId){
                   postService.getPostComments(postId)
                        (function(data) {
                            post.comments = data;
                        })
                        .error(function () {
                            notifyService.showError('Error, try again later.');
                        })
                }
            })
        };

        $scope.ShowLessComments = function(postId){
            $scope.newsFeedData.forEach(function(post){
                if(post.id == postId){
                    post.comments = post.comments.slice(0, 3);
                }
            })
        };

        $scope.likeComment = function(postId, commentId){
            $scope.newsFeedData.forEach(function(post){
                if(post.id == postId){
                    if(post.author.isFriend ||
                        post.wallOwner.isFriend ||
                        post.author.username == sessionStorage['username'] ||
                        post.wallOwner.username ==sessionStorage['username']){
                        post.comments.forEach(function(comment){
                            if(comment.id == commentId){
                                postService.likeComment(postId, commentId)
                                    .success(function() {
                                        comment.liked = true;
                                        comment.likesCount += 1;
                                    })
                                    .error(function () {
                                        notifyService.showError('Liking Failed! Try Again!');
                                    })
                            }
                        });
                    }
                    else{
                        notifyService.showError('You can only like your friends posts comments!');
                    }
                }
            });
        };

        $scope.unlikeComment = function(postId, commentId){
            $scope.newsFeedData.forEach(function(post){
                if(post.id == postId){
                    if(post.author.isFriend ||
                        post.wallOwner.isFriend ||
                        post.author.username == sessionStorage['username'] ||
                        post.wallOwner.username ==sessionStorage['username']){
                        post.comments.forEach(function(comment){
                            if(comment.id == commentId){
                                postService.unlikeComment(postId, commentId)
                                    (function() {
                                        comment.liked = false;
                                        comment.likesCount -= 1;

                                    })
                                    .error(function () {
                                        notifyService.showError('Error, try again later.');
                                    })
                            }
                        });
                    }
                    else{
                        notifyService.showError('You can only like your friends posts comments!');
                    }
                }
            });
        };

        $scope.deleteComment = function(postId, commentId){
            $scope.newsFeedData.forEach(function(post){
                if(post.id == postId){
                    post.comments.forEach(function(comment){
                        if(comment.id == commentId){
                            if(post.author.username == sessionStorage['username'] || comment.author.username == sessionStorage['username']){
                                postService.deleteComment(postId, commentId)
                                .success(function() {
                                        postService.getPostComments(postId)
                                            .success(function(data) {
                                                if(post.totalCommentsCount == post.comments.length){
                                                    post.comments = data;
                                                }
                                                else{
                                                    post.comments = data.slice(0,3);
                                                }

                                                post.totalCommentsCount -= 1;
                                            });
                                        notifyService.showError('You Deleted A Comment.');
                                    })
                                    .error(function () {
                                        notifyService.showError('Delete Failed! Try Again!');
                                    })
                            }
                            else{
                                notifyService.showError('You can only delete own or your posts comments!');
                            }
                        }
                    })
                }
            });
        };

        $scope.showEditCommentPanel = function(postId, commentId){
            $scope.newsFeedData.forEach(function(post){
                if(post.id == postId) {
                    post.comments.forEach(function(comment){
                        if(comment.id == commentId){
                            if (comment.author.username == sessionStorage['username']) {
                                $scope.editCommentOldText = comment.commentContent;
                                $scope.editCommentPostData = comment;
                                $scope.editCommentPanelVisible = true;
                                $scope.editCommentPostId = postId;
                            }
                            else {
                                notifyService.showError('You can edit only your comments!');
                                $scope.editCommentPanelVisible = false;
                            }
                        }
                    });
                }
            });
        };

        $scope.sendRequestUserNewsFeed = function(username){
            friendsService.SendRequest(username)
                .success(function () {
                    post.author.hasPendingRequest = true;
                    notifyService.showInfo('You invite request successfully');
                })
                .error(function(){
                    notifyService.showError('Error, try again later');
                })
        };

        $scope.commentHover = function(username){
            friendsService.getUserFullData(username)
            .success(function (data) {
                    if(data.hasPendingRequest && data.username != sessionStorage['username']){
                        $scope.commentUserStatus = 'Pending';
                    }
                    else if(data.isFriend){
                        $scope.commentUserStatus = 'Friend';
                    }
                    else if(!data.isFriend && !data.hasPendingRequest){
                        $scope.commentUserStatus = 'Invite';
                    }
                });

            return true;
        };
        if(!$routeParams.username){
            $scope.postsOwner = localStorage['username'];
            postService.getNewsFeed($scope.postsStartId)
                .success(function(data) {
                    data.forEach(function(post){
                        if(post.author.profileImageData == null){
                            post.author.profileImageData = "data:image/jpg;base64," + baseProfileImage;
                        }

                        if(post.wallOwner.profileImageData == null){
                            post.wallOwner.profileImageData = "data:image/jpg;base64," + baseProfileImage;
                        }

                        post.comments.forEach(function(comment){
                            if(comment.author.profileImageData == null){
                                comment.author.profileImageData = "data:image/jpg;base64," + baseProfileImage;
                            }
                        });

                        $scope.newsFeedData.push(post);
                    });
                })
                .error(function () {
                    notifyService.showError('Server Error! Try Again!');
                })
        }
        else{
            $scope.postsOwner = $routeParams.username;
            postService.getUserWall($scope.postsStartId, $scope.postsOwner)
                .success(function(data) {
                    data.forEach(function(post){
                        if(post.author.profileImageData == null){
                            post.author.profileImageData = "data:image/jpg;base64," + baseProfileImage;
                        }

                        if(post.wallOwner.profileImageData == null){
                            post.wallOwner.profileImageData = "data:image/jpg;base64," + baseProfileImage;
                        }

                        post.comments.forEach(function(comment){
                            if(comment.author.profileImageData == null){
                                comment.author.profileImageData = "data:image/jpg;base64," + baseProfileImage;
                            }
                        });

                        $scope.newsFeedData.push(post);
                    });
                })
            .error(function () {
                    notifyService.showError('Server Error! Try Again!');
                });
        }
    }]);