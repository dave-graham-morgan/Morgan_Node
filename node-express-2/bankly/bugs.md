Bug 1: the authUser function doesn't validate the token, it just decodes it.  This can be spoofed. I changed the function so that it validates the token and only proceeds if that token is valid.

bug 2: we needed to await the User.authenticate in the login route.  This was causing an issue when username/passwords did not match and the middleware wasn't catching the exception because the system had already moved on. awaiting authenticate fixed it. 

bug 3: patch couldn't handle null request so I added a check. throws a 400 if attempt is made with no data to update. 

bug 4: needed to await User.delete

bug 5: defect in the patch request using requiresAdmin middleware.  Only admin will be allowed to patch but the requirement is to allow the logged in user to also patch.  if that user is not an admin it will never allow user to update. added a middleware route. 

bug 6: patch does not dissalow users to update certain fields and does not throw an error if erroneous fields are sent