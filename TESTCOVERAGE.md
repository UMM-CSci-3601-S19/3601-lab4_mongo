One thing of note for all of our e2e tests is that something about them is broken. The way we set up adding todos, it
actually adds todos to the real database. This makes number of todo expectations incorrect after each run.
We valued our sleep and time to prepare for iterations 1 over fixing the root of the issue. We left the troublesome
e2e tests in. This wasn't that big of a deal to us as the user e2e tests were also broken from the same problem.

Todo list:
'should get and highlight Todos title attribute' Title of the page should be todos if navigateTo works

'Should open the expansion panel and get the status' demonstrates that typing complete into the status bar gives us the owner that we constructed with a unique name and a todo that is completed

'should allow us to clear a search for status and then still successfully search again' demonstrates that we can search for status multiple times in a row without breaking
*(THIS ACTUALLY DOES BREAK BUT ONLY BECAUSE TODOS ARE ADDED AS TESTS RUN)
''
'Should allow us to search for an owner, update that search string, and then still successfully search'
This should be the same the same as the previous, but adds a letter to narrow the search from "Blanche" to "Barry" (also NOT WORKING for the same reason)


In the adding todo tests, they check for the existence of the add todo button and then actually click it
 
For basically the rest of the tests the validator gives you the correct error based on our regular expressions.