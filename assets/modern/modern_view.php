<h1>FreeCodeCamp</h1>

	<main class="ng-scope" ng-controller="MainCtrl" ng-app="PomodoroApp">

		<header>
			<div class="session">
				<div class="breakCtrl">
					<p>break length</p>
					<button class="minus" ng-click="breakLengthChange(-1)">-</button>
					<span class="time ng-binding">5</span>
					<button class="plus" ng-click="breakLengthChange(1)">+</button>
				</div>
				<div class="sessionCtrl">
					<p>session length</p>
					<button class="minus" ng-click="sessionLengthChange(-1)">-</button>
					<span class="time ng-binding">25</span>
					<button class="plus" ng-click="sessionLengthChange(1)">+</button>
				</div>
			</div>
		</header>
		
		<section ng-click="toggleTimer()">
			<div class="timer">
				<p class="title ng-binding">Session</p>
				<p class="ng-binding">25</p>
				<span class="fill" ng-style="{'height':fillHeight, 'background':fillColor }" style="height: 0%;"></span>
			</div>
		</section>
	</main>
