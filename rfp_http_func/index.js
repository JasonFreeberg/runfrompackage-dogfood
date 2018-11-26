var fs = require('fs');
var path = require('path');
var test_cases = `
"1" --> Returns a string, test that the function is working
"2" --> Attempt to write to home/site/wwwroot/
"3" --> Attempt to write to currect execution directory (whatever is returned by __dirname)
"4" --> Attempt to write many files to /wwwroot
`;

module.exports = async function (context, req) {

    if (req.query.test) {
        var testcase =  parseInt(req.query.test);
        
        switch (testcase) {
            case 1:
                context.res = {
                    body: "Successfully ran test case 1. This function is working properly."
                };
            break;

            case 2:
                var full_path = path.join('home','site','wwwroot','testfile.txt');
                context.log('Case '+testcase+': Attempting to write file: '+full_path);

                fs.writeFile(full_path, 'Contents of test file.', function(err) {
                    if (err) {
                        context.log(err);
                        context.res = {
                            status: 500,
                            body: 'Ran case '+testcase+', failed to write to '+full_path+' (as expected). Error message: \n' + err.toString
                        };
                        throw err;
                    } else {
                        context.log('File written: '+full_path)
                        context.res = {
                            body: 'Ran case '+testcase+',  wrote file to '+full_path
                        };
                    } 
                });
            break;

            case 3:
                var full_path = path.join(__dirname, 'testfile.txt');
                context.log('Case '+testcase+': Attempting to create the file: ' + full_path);
                
                fs.writeFile(full_path, 'Contents of test file.', function(err) {
                    if (err) {
                        context.log(err);
                        context.res = {
                            status: 500,
                            body: 'Ran case '+testcase+', failed to write to '+full_path+' (as expected). Error message:\n'+err.toString
                        };
                        throw err;
                    } else {
                        context.log('File written to '+full_path)
                        context.res = {
                            body: 'Ran case '+testcase+', wrote file to '+full_path
                        };
                    } 
                });
            break;
            
            case 4:
                context.log('Case '+testcase+': Writing 500 files to /wwwroot.');

                for (var i = 0; i < 500; i++) {
                    var full_path = path.join('home','site','wwwroot','testfile'+i+'.txt'); 
                    fs.writeFile(full_path, 'Contents of test file '+i, function(err){
                        if (err) {
                            context.log(err);
                            context.res = {
                                status: 500,
                                body: 'Ran case '+testcase+' failed to write to /wwwroot (as expected). Error message:\n'+err.toString
                            };
                            throw err;
                        } else {
                            context.log('Files written to /wwwroot (unexpectedly).');
                            context.res = {
                                body: 'Ran case '+testcase+', wrote files to /wwwroot (unexpectedly).'
                            }
                        }
                    })
                }
            break;

            case 5:
                // Rename files, copy files, delete files
            break;

            default:
                context.res = {
                    body: "I didn't understand that. Please provide one of the test case to execute:" + test_cases
                };
            break;
        } 
    }
    else {
        context.res = {
            body: 'Please pass a query string named \"test\" with one of the following values...' + test_cases
        };
    }
};