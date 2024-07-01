sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'inv/purchaseorderapp/test/integration/FirstJourney',
		'inv/purchaseorderapp/test/integration/pages/POsList',
		'inv/purchaseorderapp/test/integration/pages/POsObjectPage',
		'inv/purchaseorderapp/test/integration/pages/POItemsObjectPage'
    ],
    function(JourneyRunner, opaJourney, POsList, POsObjectPage, POItemsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('inv/purchaseorderapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePOsList: POsList,
					onThePOsObjectPage: POsObjectPage,
					onThePOItemsObjectPage: POItemsObjectPage
                }
            },
            opaJourney.run
        );
    }
);